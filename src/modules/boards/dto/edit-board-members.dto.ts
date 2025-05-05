import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail } from "class-validator";

export class EditBoardMembersDto {
  @ApiProperty()
  @IsEmail(undefined, { each: true })
  memberEmails: string[];

  @ApiProperty()
  @IsBoolean()
  isRemove: boolean;
}