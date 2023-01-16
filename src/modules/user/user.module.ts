import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { User } from '../../database/entities/user.entity';
import { Role } from '../../database/entities/role.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    forwardRef(() => AccountModule),
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
  exports: [TypeOrmModule],
})
export class UserModule {}
