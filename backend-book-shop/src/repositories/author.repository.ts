import * as mongoose from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Author } from 'src/documents/author/db.data';
import { CreateAuthor } from 'src/models/create/create.author.model';

@Injectable()
export class AuthorRepository {
  constructor(
    @Inject('AUTHOR_MODEL')
    private readonly authorModel: mongoose.Model<Author>,
  ) {}

  async create(user: Author): Promise<CreateAuthor> {
    const createdAuthor = new this.authorModel(user);
    return await createdAuthor.save((err, createdAuthor) => {
      createdAuthor
      .populate('books')
      .execPopulate()
      .then((createdAuthor: object): void => {
          console.log('Author was created now =>  ' + `${createdAuthor}`);
      });
  });
  }

  async findAll(): Promise<Author[]> {
    return await this.authorModel.find().populate('books').exec();
  }

  async findOne(id: string): Promise<Author> {
    return await this.authorModel.findById(id).populate('books').exec();
  }

  async update(id: string, user: Author): Promise<CreateAuthor> {
    return await this.authorModel.findByIdAndUpdate(id, user, { new: true }).populate('books').exec();
  }

  async delete(id: string): Promise<Author> {
    return await this.authorModel.deleteOne(id).populate('books').exec();  // use method delete(id)
  }

  async findOneByName(username: string): Promise<Author> {
    return await this.authorModel.findOne({username});
  }
}
