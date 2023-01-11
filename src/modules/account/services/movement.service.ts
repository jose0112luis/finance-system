import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movement } from '../../../database/entities/movement.entity';
import { CreateMovementDto, UpdateMovementDto } from '../dto/movement.dto';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement) private movementRepo: Repository<Movement>,
  ) {}

  findAll() {
    return this.movementRepo.find();
  }

  async findOne(id: number) {
    const movement = await this.movementRepo.findOne({ where: { id } });
    if (!movement) {
      throw new NotFoundException(`Movement ${id} not found`);
    }
    return movement;
  }

  async create(data: CreateMovementDto) {
    const newMovement = this.movementRepo.create(data);
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
