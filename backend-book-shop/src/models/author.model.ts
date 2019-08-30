import { ApiModelProperty } from '@nestjs/swagger';

export class Author {
    @ApiModelProperty()
    _id: string ;
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    books: string[];
}
