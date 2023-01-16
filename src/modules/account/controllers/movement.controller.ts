import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  // Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MovementService } from '../services/movement.service';
import { CreateMovementDto, UpdateMovementDto } from '../dto/movement.dto';

@ApiTags('movements')
@Controller('movements')
export class MovementController {
  constructor(private MovementService: MovementService) {}

  @Get()
  @ApiOperation({ summary: 'List of movements' })
  findAll() {
    return this.MovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.MovementService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateMovementDto) {
    return this.MovementService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMovementDto,
  ) {
    return this.MovementService.update(id, data);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.MovementService.remove(id);
  // }
}
