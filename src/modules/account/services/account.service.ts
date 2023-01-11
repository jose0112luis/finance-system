import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from 'src/database/entities/account.entity';
import { CreateAccountDto, UpdateAccountDto } from '../dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>,
  ) {}

  findAll() {
    return this.accountRepo.find();
  }

  async findOne(id: number) {
    const account = await this.accountRepo.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Account ${id} not found`);
    }
    return account;
  }

  async create(data: CreateAccountDto) {
    const newAccount = this.accountRepo.create(data);
    return this.accountRepo.save(newAccount);
  }

  async update(id: number, data: UpdateAccountDto) {
    const account = await this.accountRepo.findOne({ where: { id } });
    this.accountRepo.merge(account, data);
    return this.accountRepo.save(account);
  }

  remove(id: number) {
    return this.accountRepo.delete(id);
  }
}
