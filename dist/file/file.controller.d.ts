/// <reference types="multer" />
import { FileService } from './file.service';
export declare class FileController {
    private fileService;
    constructor(fileService: FileService);
    uploadProfileImage(req: any, res: any, file: Express.Multer.File): any;
}
