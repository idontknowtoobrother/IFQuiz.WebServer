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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcryptjs");
const dist_1 = require("@nestjs/jwt/dist");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const { email, password, fullname, birthday } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            email,
            password: hashedPassword,
            fullname,
            birthday
        });
        const token = this.jwtService.sign({
            id: user._id
        });
        const responeUser = {
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            status: user.status,
            birthday: user.birthday,
            profileImage: user.profileImage,
            token: token
        };
        return responeUser;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid email or password");
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException("Invalid email or password");
        }
        const token = this.jwtService.sign({
            id: user._id
        });
        const responeUser = {
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            status: user.status,
            birthday: user.birthday,
            profileImage: user.profileImage,
            token: token
        };
        return responeUser;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        dist_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map