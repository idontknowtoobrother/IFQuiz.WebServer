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
exports.QuizzesSchema = exports.Quizzes = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var Category;
(function (Category) {
    Category["MATH"] = "Mathematics";
    Category["SCIENCE"] = "Science";
    Category["ENG"] = "English Language";
    Category["COMSCI"] = "Computer Science";
    Category["PE"] = "Physical Education";
    Category["ART"] = "Creative Arts";
    Category["LANGUAGE"] = "World Language";
})(Category = exports.Category || (exports.Category = {}));
let Quizzes = class Quizzes {
};
__decorate([
    (0, mongoose_1.Prop)({ require: true }),
    __metadata("design:type", String)
], Quizzes.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Quizzes.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Quizzes.prototype, "category", void 0);
Quizzes = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Quizzes);
exports.Quizzes = Quizzes;
exports.QuizzesSchema = mongoose_1.SchemaFactory.createForClass(Quizzes);
//# sourceMappingURL=quizzes.schema.js.map