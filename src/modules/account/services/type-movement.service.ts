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

  async findAll() {
    const typeMov = await this.typeMovementRepo.find();
    if (typeMov.length === 0) {
      throw new NotFoundException('No Registered Movement Type Yet');
    }
    return typeMov;
  }

  async findOne(id: number) {
    const typeMovement = await this.typeMovementRepo.findOne({ where: { id } });
    if (!typeMovement) {
      throw new NotFoundException(`Type Movement ${id} not found`);
    }
    return typeMovement;
  }

  async create(data: CreateTypeMovementDto) {
    const typeMov = await this.typeMovementRepo.findOne({
      where: { name: data.name },
    });
    if (typeMov) {
      throw new NotFoundException(`Movement Type ${data.name} already exists`);
    }
    const newTypeMovement = this.typeMovementRepo.create(data);
    return this.typeMovementRepo.save(newTypeMovement);
  }

  async update(id: number, data: UpdateTypeMovementDto) {
    const typeMovement = await this.typeMovementRepo.findOne({ where: { id } });
    if (!typeMovement) {
      throw new NotFoundException(`Movement Type ${id} does not exist`);
    }
    this.typeMovementRepo.merge(typeMovement, data);
    return this.typeMovementRepo.save(typeMovement);
  }

  // remove(id: number) {
  //   return this.typeMovementRepo.delete(id);
  // }
}
