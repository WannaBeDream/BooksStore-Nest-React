import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/models/user.model';
import { CreateUser } from 'src/models/create/create.user.model';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async create(user: User): Promise<CreateUser> {
        return await  this.userRepository.create(user);
    }

    async update(id: string, user: User): Promise<CreateUser> {
        const updatedUser = await this.userRepository.update(id, user);
        return updatedUser;
    }

    async delete(id: string): Promise<User> {
        const deletedUser = await this.userRepository.delete(id);
        return deletedUser;
    }

     async findOneByUsername(user: string): Promise<User | undefined> {
     return await this.userRepository.findOneByName(user);
  }

}
