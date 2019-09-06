import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponse {
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly role: string;
    @ApiModelProperty()
    readonly token: string;
 }
