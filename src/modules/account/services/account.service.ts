import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAccountDto, UpdateAccountDto } from '../dto/account.dto';
import { Account } from 'src/database/entities/account.entity';
import { TypeAccount } from 'src/database/entities/typeAccount.entity';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    @InjectRepository(TypeAccount)
    private typeAccountRepo: Repository<TypeAccount>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll() {
    const accounts = await this.accountRepo.find();
    if (accounts.length === 0) {
      throw new NotFoundException('No Registered Accounts Yet');
    }
    return accounts;
  }

  // async findOne(id: number) {
  //   const account = await this.accountRepo.findOne({
  //     where: { id },
  //     relations: ['user', 'typeAccount'],
  //   });
  //   if (!account) {
  //     throw new NotFoundException(`Account ${id} not found`);
  //   }
  //   return account;
  // }

  async findOne(idAccount: string) {
    const account = await this.accountRepo.findOne({
      where: { accountNumber: idAccount },
      relations: ['user', 'typeAccount'],
    });
    if (!account) {
      throw new NotFoundException(`Account ${idAccount} not found`);
    }
    return account;
  }

  async create(data: CreateAccountDto) {
    const account = await this.accountRepo.findOne({
      where: { accountNumber: data.accountNumber },
    });
    if (account) {
      throw new NotFoundException(
        `Account ${data.accountNumber} already exists`,
      );
    }
    const newAccount = this.accountRepo.create(data);
    const typeAcc = await this.typeAccountRepo.findOne({
      where: { id: data.typeAccountId },
    });
    if (!typeAcc) {
      throw new NotFoundException(
        `Account Type ${data.typeAccountId} does not exist`,
      );
    }
    const user = await this.userRepo.findOne({ where: { id: data.userId } });
    if (!user) {
      throw new NotFoundException(`User ${data.userId} does not exist`);
    }
    newAccount.typeAccount = typeAcc;
    newAccount.user = user;
    return this.accountRepo.save(newAccount);
  }

  async update(id: number, data: UpdateAccountDto) {
    const account = await this.accountRepo.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Account ${id} does not exist`);
    }
    this.accountRepo.merge(account, data);
    return this.accountRepo.save(account);
  }

  // remove(id: number) {
  //   return this.accountRepo.delete(id);
  // }
}
