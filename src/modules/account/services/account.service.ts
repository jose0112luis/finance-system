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

  findAll() {
    return this.accountRepo.find();
  }

  async findOne(id: number) {
    const account = await this.accountRepo.findOne({
      where: { id },
      relations: ['user', 'typeAccount'],
    });
    if (!account) {
      throw new NotFoundException(`Account ${id} not found`);
    }
    return account;
  }

  async create(data: CreateAccountDto) {
    const newAccount = this.accountRepo.create(data);
    const typeAcc = await this.typeAccountRepo.findOne({
      where: { id: data.typeAccountId },
    });
    const user = await this.userRepo.findOne({ where: { id: data.userId } });
    newAccount.typeAccount = typeAcc;
    newAccount.user = user;
    return this.accountRepo.save(newAccount);
  }

  async update(id: number, data: UpdateAccountDto) {
    const account = await this.accountRepo.findOne({ where: { id } });
    this.accountRepo.merge(account, data);
    return this.accountRepo.save(account);
  }

  // remove(id: number) {
  //   return this.accountRepo.delete(id);
  // }
}
