"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
const file_service_1 = require("./file.service");
const uuid_1 = require("uuid");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadProfileImage(req, file) {
        return {
            profileImage: await this.fileService.updateProfileImage(req.user._id, file.filename)
        };
    }
    getProfileImage(req, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), './resources/profile-image/' + req.user.profileImage)));
    }
};
__decorate([
    (0, common_1.Post)('/upload/profile-image'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profile-image', {
        storage: (0, multer_1.diskStorage)({
            destination: 'resources/profile-image',
            filename: (req, file, cb) => {
                const filename = (0, uuid_1.v4)();
                const ext = path.parse(file.originalname).ext;
                cb(null, `${filename}${ext}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|png|jpeg|gif)$/))
                cb(null, true);
            else
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        },
        limits: { fileSize: 4e+6 },
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadProfileImage", null);
__decorate([
    (0, common_1.Get)('/get/profile-image'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FileController.prototype, "getProfileImage", null);
FileController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map