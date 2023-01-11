import { IsDecimal, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMovementDto {
  @IsDecimal({ decimal_digits: '6,2' })
  @IsNotEmpty()
  @ApiProperty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly accountId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly typeMovementId: number;
}

export class UpdateMovementDto extends PartialType(CreateMovementDto) {}
