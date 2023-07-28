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

import { AccountService } from '../services/account.service';
import { CreateAccountDto, UpdateAccountDto } from '../dto/account.dto';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  @ApiOperation({ summary: 'List of Accounts' })
  findAll() {
    return this.accountService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.accountService.findOne(id);
  // }

  @Get(':idAccount')
  findOne(@Param('idAccount') idAccount: string) {
    return this.accountService.findOne(idAccount);
  }

  @Post()
  create(@Body() data: CreateAccountDto) {
    return this.accountService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAccountDto,
  ) {
    return this.accountService.update(id, data);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.accountService.remove(id);
  // }
}
