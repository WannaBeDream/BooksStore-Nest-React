import { ApiModelProperty } from '@nestjs/swagger';

export class Book  {
    @ApiModelProperty()
    _id?: string;
    @ApiModelProperty()
    title?: string;
    @ApiModelProperty()
    description: string;
    @ApiModelProperty()
    authors?: string[];
    @ApiModelProperty()
    coast?: string;

}
