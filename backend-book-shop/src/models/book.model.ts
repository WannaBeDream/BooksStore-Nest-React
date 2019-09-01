import { ApiModelProperty } from '@nestjs/swagger';

export class Book  {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    title?: string;
    @ApiModelProperty()
    description: string;
    @ApiModelProperty()
    authors?: any[];
    @ApiModelProperty()
    coast?: number;

}
