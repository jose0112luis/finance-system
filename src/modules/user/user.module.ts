import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { User } from '../../database/entities/user.entity';
import { Role } from '../../database/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
})
export class UserModule {}
