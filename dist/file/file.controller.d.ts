/// <reference types="multer" />
import { FileService } from './file.service';
export declare class FileController {
    private fileService;
    constructor(fileService: FileService);
    uploadProfileImage(req: any, file: Express.Multer.File): Promise<{
        profileImage: String;
    }>;
}
