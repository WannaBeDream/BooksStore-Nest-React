import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBook  {
    @ApiModelProperty()
    title?: string;
    @ApiModelProperty()
    description: string;
    @ApiModelProperty()
    authors?: any[];
    @ApiModelProperty()
    coast?: number;

}
