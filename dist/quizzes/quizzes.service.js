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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const quizzes_schema_1 = require("./schemas/quizzes.schema");
const exceptions_1 = require("@nestjs/common/exceptions");
let QuizzesService = class QuizzesService {
    constructor(quizzesModel) {
        this.quizzesModel = quizzesModel;
    }
    async getAll(query) {
        const keyword = query.name ? {
            name: {
                $regex: query.name,
                $options: 'i'
            }
        } : {};
        const quizzes = await this.quizzesModel.find(Object.assign({}, keyword));
        return quizzes;
    }
    async get(id) {
        if (!mongoose_2.default.isValidObjectId(id))
            throw new exceptions_1.BadRequestException('Incorrect id.');
        const quiz = await this.quizzesModel.findById(id);
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found!');
        }
        return quiz;
    }
    async create(newQuiz, user) {
        console.log(newQuiz);
        const data = Object.assign(newQuiz, { user: user._id });
        const quiz = await this.quizzesModel.create(data);
        return quiz;
    }
    async deleteByUser(id, userId) {
        if (!mongoose_2.default.isValidObjectId(id))
            throw new exceptions_1.BadRequestException('Incorrect id.');
        const res = await this.quizzesModel.findOneAndDelete({
            _id: id,
            user: userId
        });
        if (!res) {
            throw new common_1.NotFoundException('Quiz not found or not owned.');
        }
        return 'Quiz deleted.';
    }
    async updateByUser(id, updateQuiz, userId) {
        if (!mongoose_2.default.isValidObjectId(id))
            throw new exceptions_1.BadRequestException('Incorrect id.');
        return await this.quizzesModel.findOneAndUpdate({
            _id: id,
            user: userId
        }, updateQuiz, {
            new: true,
            runValidators: true
        });
    }
};
QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(quizzes_schema_1.Quizzes.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuizzesService);
exports.QuizzesService = QuizzesService;
//# sourceMappingURL=quizzes.service.js.map