import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUser {
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    email?: string;
    @ApiModelProperty()
    password?: string;
    @ApiModelProperty()
    role?: string;
}
