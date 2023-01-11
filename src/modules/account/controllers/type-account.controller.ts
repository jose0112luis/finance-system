import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { TypeAccountService } from '../services/type-account.service';
import {
  CreateTypeAccountDto,
  UpdateTypeAccountDto,
} from '../dto/typeAccount.dto';

@ApiTags('type-account')
@Controller('type-account')
export class TypeAccountController {
  constructor(private typeAccountService: TypeAccountService) {}

  @Get()
  @ApiOperation({ summary: 'List of Types Account' })
  findAll() {
    return this.typeAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.typeAccountService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateTypeAccountDto) {
    return this.typeAccountService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTypeAccountDto,
  ) {
    return this.typeAccountService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.typeAccountService.remove(id);
  }
}
