import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Author } from 'src/documents/author/db.data';
import { CreateAuthor } from 'src/models/create/create.author.model';

@Injectable()
export class AuthorRepository {
  constructor(
    @Inject('AUTHOR_MODEL')
    private readonly authorModel: Model<Author>,
  ) {}

  async create(user: Author): Promise<CreateAuthor> {
    const createdAuthor = new this.authorModel(user);
    return await createdAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return await this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<Author> {
    return await this.authorModel.findOne({ _id: id });
  }

  async update(id: string, user: Author): Promise<CreateAuthor> {
    return await this.authorModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<Author> {
    return await this.authorModel.deleteOne(id);  // use method delete(id)
  }

  async findOneByName(username: string): Promise<Author> {
    return await this.authorModel.findOne({username});
  }
}
