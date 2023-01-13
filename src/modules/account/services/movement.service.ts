import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMovementDto, UpdateMovementDto } from '../dto/movement.dto';
import { Movement } from '../../../database/entities/movement.entity';
import { TypeMovement } from 'src/database/entities/typeMovement.entity';
import { Account } from 'src/database/entities/account.entity';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement) private movementRepo: Repository<Movement>,
    @InjectRepository(TypeMovement)
    private typeMovementRepo: Repository<TypeMovement>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
  ) {}

  findAll() {
    return this.movementRepo.find();
  }

  async findOne(id: number) {
    const movement = await this.movementRepo.findOne({
      where: { id },
      relations: ['typeMovement'],
    });
    if (!movement) {
      throw new NotFoundException(`Movement ${id} not found`);
    }
    return movement;
  }

  async create(data: CreateMovementDto) {
    const newMovement = this.movementRepo.create(data);
    const typeMovement = await this.typeMovementRepo.findOne({
      where: { id: data.typeMovementId },
    });
    const account = await this.accountRepo.findOne({
      where: { id: data.accountId },
    });
    if (!typeMovement || !account) {
      throw new NotFoundException(`Movement Type or Account not found`);
    }
    newMovement.typeMovement = typeMovement;
    newMovement.account = account;
    return this.movementRepo.save(newMovement);
  }

  async update(id: number, data: UpdateMovementDto) {
    const movement = await this.movementRepo.findOne({ where: { id } });
    this.movementRepo.merge(movement, data);
    return this.movementRepo.save(movement);
  }

  remove(id: number) {
    return this.movementRepo.delete(id);
  }
}
