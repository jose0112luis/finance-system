import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeAccount } from '../../../database/entities/typeAccount.entity';
import {
  CreateTypeAccountDto,
  UpdateTypeAccountDto,
} from '../dto/typeAccount.dto';

@Injectable()
export class TypeAccountService {
  constructor(
    @InjectRepository(TypeAccount)
    private typeAccountRepo: Repository<TypeAccount>,
  ) {}

  findAll() {
    return this.typeAccountRepo.find();
  }

  async findOne(id: number) {
    const typeAccount = await this.typeAccountRepo.findOne({ where: { id } });
    if (!typeAccount) {
      throw new NotFoundException(`Type Account ${id} not found`);
    }
    return typeAccount;
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
