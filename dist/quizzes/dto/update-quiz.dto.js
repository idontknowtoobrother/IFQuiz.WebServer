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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuizDto = void 0;
const class_validator_1 = require("class-validator");
const user_schema_1 = require("../../auth/schemas/user.schema");
const quizzes_schema_1 = require("../schemas/quizzes.schema");
class UpdateQuizDto {
    constructor() {
        this.questions = [];
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuizDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuizDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(quizzes_schema_1.Category),
    __metadata("design:type", String)
], UpdateQuizDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)({ message: "Can't pass user id." }),
    __metadata("design:type", user_schema_1.User)
], UpdateQuizDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], UpdateQuizDto.prototype, "questions", void 0);
exports.UpdateQuizDto = UpdateQuizDto;
//# sourceMappingURL=update-quiz.dto.js.map