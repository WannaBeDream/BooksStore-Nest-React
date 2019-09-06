import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/models/user.model';
import { CreateUser } from 'src/models/create/create.user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async create(newuser: CreateUser): Promise<CreateUser> {
    const { username, password, confirmPassword, role, email} = newuser;
    const salt = await bcrypt.genSalt(10);
    const user: CreateUser = {
      username,
      password: await this.getHash(password, salt),
      confirmPassword,
      role,
      email,
    };
    const newUser = this.userRepository.create(user);

    return  newUser;
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

    async getHash(password: string, saltRounds: string): Promise<string> {
        return bcrypt.hash(password, saltRounds);
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

}
