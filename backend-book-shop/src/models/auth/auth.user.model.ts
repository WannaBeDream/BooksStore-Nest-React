import { ApiModelProperty } from '@nestjs/swagger';

export class AuthUser {
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    password?: string;
}
