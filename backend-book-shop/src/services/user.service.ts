import { Injectable,Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

    
    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(id: string): Promise<User> {
        return await this.userModel.findOne({ _id: id });
    }

    async create(user: User): Promise<User> { 
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }

    async update(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
 }

}
