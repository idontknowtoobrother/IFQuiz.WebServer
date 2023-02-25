import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FileService } from './file.service';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { Observable, of } from 'rxjs';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService){}

    @Post('/upload/profile-image')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('profile-image',{
        storage: diskStorage({
            destination: 'resources/profile-image',
            filename: (req, file, cb) => {
                const filename = uuidv4()
                const ext = path.parse(file.originalname).ext
                cb(null, `${filename}${ext}`)
            }
        })
    }))
    async uploadProfileImage(
        @Req()
        req,
        @UploadedFile()
        file: Express.Multer.File
    ){
        return {
            profileImage: await this.fileService.updateProfileImage(req.user._id, file.filename)
        }
    }

    @Get('/get/profile-image')
    @UseGuards(AuthGuard())
    getProfileImage(
        @Req() req,
        @Res() res
    ):Observable<Object>{       
        return of(res.sendFile(join(process.cwd(),'./resources/profile-image/' + req.user.profileImage )))
    }

}
