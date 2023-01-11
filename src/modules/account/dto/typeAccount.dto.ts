import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTypeAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
}

export class UpdateTypeAccountDto extends PartialType(CreateTypeAccountDto) {}
