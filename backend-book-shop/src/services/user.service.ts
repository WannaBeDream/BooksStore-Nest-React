import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository'
import { User } from 'src/models/user.model';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    
    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async findOne(id: String): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async create(user: User): Promise<User> { 
        return await  this.userRepository.create(user);
    }

    async update(id: String, user: User): Promise<User> {
        return await this.userRepository.update(id, user);
    }

    async delete(id: String): Promise<User> {
        return await this.userRepository.delete(id);
    }

    

}
