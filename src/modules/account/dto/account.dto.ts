import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly accountNumber: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly accountBalance: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly state: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly typeAccountId: number;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
