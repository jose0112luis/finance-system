import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeMovement } from '../../../database/entities/typeMovement.entity';
import {
  CreateTypeMovementDto,
  UpdateTypeMovementDto,
} from '../dto/typeMovement.dto';

@Injectable()
export class TypeMovementService {
  constructor(
    @InjectRepository(TypeMovement)
    private typeMovementRepo: Repository<TypeMovement>,
  ) {}

  findAll() {
    return this.typeMovementRepo.find();
  }

  async findOne(id: number) {
    const typeMovement = await this.typeMovementRepo.findOne({ where: { id } });
    if (!typeMovement) {
      throw new NotFoundException(`Type Movement ${id} not found`);
    }
    return typeMovement;
  }

  async create(data: CreateTypeMovementDto) {
    const newTypeMovement = this.typeMovementRepo.create(data);
    return this.typeMovementRepo.save(newTypeMovement);
  }

  async update(id: number, data: UpdateTypeMovementDto) {
    const typeMovement = await this.typeMovementRepo.findOne({ where: { id } });
    this.typeMovementRepo.merge(typeMovement, data);
    return this.typeMovementRepo.save(typeMovement);
  }

  // remove(id: number) {
  //   return this.typeMovementRepo.delete(id);
  // }
}
