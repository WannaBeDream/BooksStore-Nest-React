import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/documents/user/db.data';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>,
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.deleteOne(id);  // use method delete(id)
  }

  async findOneByName(username: string): Promise<User> {
    return await this.userModel.findOne({username});
  }
}
