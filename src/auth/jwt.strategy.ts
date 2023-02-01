import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport"
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./schemas/user.schema";

 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private userModel : Model<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload){
        // get id from payload of token 
        // cause we save id from login and logout to payload token
        const { id } = payload

        // find the user in database by id
        const user = await this.userModel.findById(id)
        
        // if not found user by did not login yet or token expires
        // it's will throw error UnAuth 
        if(!user) {
            throw new UnauthorizedException("Please login first !")
        }

        return user;
    }
}