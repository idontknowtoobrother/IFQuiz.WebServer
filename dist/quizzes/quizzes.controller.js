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
exports.QuizzesController = void 0;
const common_1 = require("@nestjs/common");
const request_mapping_decorator_1 = require("@nestjs/common/decorators/http/request-mapping.decorator");
const create_quiz_dto_1 = require("./dto/create-quiz.dto");
const update_quiz_dto_1 = require("./dto/update-quiz.dto");
const quizzes_service_1 = require("./quizzes.service");
const passport_1 = require("@nestjs/passport");
let QuizzesController = class QuizzesController {
    constructor(quizzesService) {
        this.quizzesService = quizzesService;
    }
    async getQuizzes(query) {
        return this.quizzesService.getAll(query);
    }
    async getQuiz(id) {
        return this.quizzesService.get(id);
    }
    async createQuiz(createQuizDto, req) {
        return this.quizzesService.create(createQuizDto, req.user);
    }
    async updateQuiz(id, quizDto, req) {
        return this.quizzesService.updateByUser(id, quizDto, req.user._id);
    }
    async deleteQuiz(id, req) {
        return this.quizzesService.deleteByUser(id, req.user._id);
    }
};
__decorate([
    (0, request_mapping_decorator_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "getQuizzes", null);
__decorate([
    (0, request_mapping_decorator_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "getQuiz", null);
__decorate([
    (0, request_mapping_decorator_1.Post)('/create'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quiz_dto_1.CreateQuizDto, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "createQuiz", null);
__decorate([
    (0, request_mapping_decorator_1.Put)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_quiz_dto_1.UpdateQuizDto, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "updateQuiz", null);
__decorate([
    (0, request_mapping_decorator_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "deleteQuiz", null);
QuizzesController = __decorate([
    (0, common_1.Controller)('quizzes'),
    __metadata("design:paramtypes", [quizzes_service_1.QuizzesService])
], QuizzesController);
exports.QuizzesController = QuizzesController;
//# sourceMappingURL=quizzes.controller.js.map