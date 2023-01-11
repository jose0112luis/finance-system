import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  @ApiProperty({ description: 'Identification Card, 10 characters' })
  readonly identificationCard: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  @ApiProperty({ description: 'phone number must be 10 characters' })
  readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'valid email, e.g. ejemplo@gmail.com' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty()
  readonly password: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly state: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
