import { ApiModelProperty } from '@nestjs/swagger';

export class Author {
    @ApiModelProperty()
    id?: string ;
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    books: any[];
}
