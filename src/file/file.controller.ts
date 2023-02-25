import { Controller, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { User } from 'src/auth/schemas/user.schema';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService){}

    @Post('/upload/profile-image')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('profile-image',{
        storage: diskStorage({
            destination: 'resources/profile-image',
            filename: (req, file, cb) => {
                const filename = path.parse(file.originalname).name.replace(/\s/g, '')
                const ext = path.parse(file.originalname).ext
                cb(null, `${filename}${ext}`)
            }
        })
    }))
    uploadProfileImage(
        @Req()
        req,
        @Res()
        res,
        @UploadedFile()
        file: Express.Multer.File
    ){
        
        return res.status(200).json({
            filePath: file.path
        })
    }

}
