import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUser {
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly email: string;
    @ApiModelProperty()
    readonly password: string;
    @ApiModelProperty()
    readonly confirmPassword?: boolean;
    @ApiModelProperty()
    readonly role: string;
}
