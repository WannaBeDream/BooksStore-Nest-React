import { ApiModelProperty } from '@nestjs/swagger';

export class JwtPayload {
    @ApiModelProperty()
   readonly username: string;
    @ApiModelProperty()
   readonly role: string;
}
