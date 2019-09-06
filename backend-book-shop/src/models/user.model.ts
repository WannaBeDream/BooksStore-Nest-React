import { ApiModelProperty } from '@nestjs/swagger';

export class User {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    email?: string;
    @ApiModelProperty()
    password: string;
    @ApiModelProperty()
    role?: string;
    @ApiModelProperty()
    createdDate?: Date;
}
