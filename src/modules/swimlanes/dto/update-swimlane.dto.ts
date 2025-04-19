import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSwimlaneDto } from './create-swimlane.dto';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsNotEmpty } from 'class-validator';

export class UpdateSwimlaneDto extends PartialType(CreateSwimlaneDto) {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}

export class BatchUpdateSwimlaneDto {
  @ApiProperty({ type: [UpdateSwimlaneDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSwimlaneDto)
  swimlanes: UpdateSwimlaneDto[];
}
