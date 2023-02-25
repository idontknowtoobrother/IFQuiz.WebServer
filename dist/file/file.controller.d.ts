/// <reference types="multer" />
import { FileService } from './file.service';
import { Observable } from 'rxjs';
export declare class FileController {
    private fileService;
    constructor(fileService: FileService);
    uploadProfileImage(req: any, file: Express.Multer.File): Promise<{
        profileImage: String;
    }>;
    getProfileImage(req: any, res: any): Observable<Object>;
}
