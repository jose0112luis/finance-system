import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { dataSourceOptions } from './database/dataSource';
import { TypeAccountService } from './modules/account/services/type-account.service';
import { AccountService } from './modules/account/services/account.service';
import { TypeMovementService } from './modules/account/services/type-movement.service';
import { MovementService } from './modules/account/services/movement.service';
import { MovementController } from './modules/account/controllers/movement.controller';
import { TypeMovementController } from './modules/account/controllers/type-movement.controller';
import { TypeAccountController } from './modules/account/controllers/type-account.controller';
import { AccountController } from './modules/account/controllers/account.controller';
import config from './database/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USERNAME: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
  ],
  controllers: [
    AppController,
    MovementController,
    TypeMovementController,
    TypeAccountController,
    AccountController,
  ],
  providers: [
    AppService,
    TypeAccountService,
    AccountService,
    TypeMovementService,
    MovementService,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
