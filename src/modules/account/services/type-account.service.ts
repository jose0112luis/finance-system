import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

import {
  CreateTypeAccountDto,
  UpdateTypeAccountDto,
} from '../dto/typeAccount.dto';
import { TypeAccount } from '../../../database/entities/typeAccount.entity';
import { Account } from 'src/database/entities/account.entity';

@Injectable()
export class TypeAccountService {
  constructor(
    @InjectRepository(TypeAccount)
    private typeAccountRepo: Repository<TypeAccount>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
  ) {}

  findAll() {
    return this.typeAccountRepo.find();
  }

  async findOne(id: number) {
    const typeAccount = await this.typeAccountRepo.findOne({ where: { id } });
    const countAccount = await this.accountRepo.count({
      where: {
        typeAccount: Equal(id),
      },
    });
    if (!typeAccount) {
      throw new NotFoundException(`Type Account ${id} not found`);
    }
    return {
      typeAccount,
      totalAccounts: countAccount,
    };
  }

  async create(data: CreateTypeAccountDto) {
    const newTypeAccount = this.typeAccountRepo.create(data);
    return this.typeAccountRepo.save(newTypeAccount);
  }

  async update(id: number, data: UpdateTypeAccountDto) {
    const typeAccount = await this.typeAccountRepo.findOne({ where: { id } });
    this.typeAccountRepo.merge(typeAccount, data);
    return this.typeAccountRepo.save(typeAccount);
  }

  remove(id: number) {
    return this.typeAccountRepo.delete(id);
  }
}
