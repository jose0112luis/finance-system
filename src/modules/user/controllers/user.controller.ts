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

import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'List of users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':cedula')
  findOne(@Param('cedula') cedula: string) {
    return this.userService.findOne(cedula);
  }

  @Get(':cedula/accounts')
  findAccountsByUser(@Param('cedula') cedula: string) {
    return this.userService.findAccountsByUser(cedula);
  }

  @Get(':cedula/account/:idAccount/movements')
  findMovementsByAccountByUser(
    @Param('cedula') cedula: string,
    @Param('idAccount') idAccount: string,
  ) {
    return this.userService.findMovementsByAccountByUser(cedula, idAccount);
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.userService.remove(id);
  // }
}
