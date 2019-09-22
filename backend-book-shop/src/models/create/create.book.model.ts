import { ApiModelProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CreateBook  {
    @ApiModelProperty()
    title: string;
    @ApiModelProperty()
    description: string;
    @ApiModelProperty()
    authors: [mongoose.Schema.Types.ObjectId];
    @ApiModelProperty()
    coast: number;

}
