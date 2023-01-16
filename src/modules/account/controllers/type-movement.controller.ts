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

import { TypeMovementService } from '../services/type-movement.service';
import {
  CreateTypeMovementDto,
  UpdateTypeMovementDto,
} from '../dto/typeMovement.dto';

@ApiTags('type-movement')
@Controller('type-movement')
export class TypeMovementController {
  constructor(private typeMovementService: TypeMovementService) {}

  @Get()
  @ApiOperation({ summary: 'List of type movements' })
  findAll() {
    return this.typeMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.typeMovementService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateTypeMovementDto) {
    return this.typeMovementService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTypeMovementDto,
  ) {
    return this.typeMovementService.update(id, data);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.typeMovementService.remove(id);
  // }
}
