import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsUUID } from "class-validator";

export class BoardListenWebsocketDto {
  @ApiProperty()
  @IsJWT()
  token: string;
  
  @ApiProperty()
  @IsUUID()
  boardId: string;
}
