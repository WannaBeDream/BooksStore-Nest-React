import { ApiModelProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CreateAuthor {
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    books: [mongoose.Schema.Types.ObjectId];
}
