import { Injectable } from '@nestjs/common';
import { AuthorRepository } from 'src/repositories/author.repository';
import { Author } from 'src/models/author.model';

@Injectable()
export class AuthorsService {
    constructor(private readonly authorRepository: AuthorRepository) {}

    async findAll(): Promise<Author[]> {
        return await this.authorRepository.findAll();
    }

    async findOne(id: string): Promise<Author> {
        return await this.authorRepository.findOne(id);
    }

    async create(author: Author): Promise<Author> {
        return await  this.authorRepository.create(author);
    }

    async update(id: string, author: Author): Promise<Author> {
        const updatedAuthor = await this.authorRepository.update(id, author);
        return updatedAuthor;
    }

    async delete(id: string): Promise<Author> {
        const deletedAuthor = await this.authorRepository.delete(id);
        return deletedAuthor;
    }

     async findOneByUsername(user: string): Promise<Author | undefined> {
     return await this.authorRepository.findOneByName(user);
  }

}
