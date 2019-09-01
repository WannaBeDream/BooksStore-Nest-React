import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAuthor {
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    books: any[];
}
