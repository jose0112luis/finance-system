import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeMovementController } from './controllers/type-movement.controller';
import { MovementController } from './controllers/movement.controller';
import { TypeAccountController } from './controllers/type-account.controller';
import { AccountController } from './controllers/account.controller';
import { TypeMovementService } from './services/type-movement.service';
import { MovementService } from './services/movement.service';
import { TypeAccountService } from './services/type-account.service';
import { AccountService } from './services/account.service';
import { TypeMovement } from 'src/database/entities/typeMovement.entity';
import { Movement } from 'src/database/entities/movement.entity';
import { TypeAccount } from 'src/database/entities/typeAccount.entity';
import { Account } from 'src/database/entities/account.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([TypeMovement, Movement, TypeAccount, Account]),
  ],
  controllers: [
    TypeMovementController,
    MovementController,
    TypeAccountController,
    AccountController,
  ],
  providers: [
    TypeMovementService,
    MovementService,
    TypeAccountService,
    AccountService,
  ],
  exports: [TypeOrmModule],
})
export class AccountModule {}
