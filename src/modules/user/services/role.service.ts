import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../../../database/entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../dto/role.dto';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async findAll() {
    const roles = await this.roleRepo.find();
    if (roles.length === 0) {
      throw new NotFoundException('No Registered Roles Yet');
    }
    return roles;
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!role) {
      throw new NotFoundException(`Role ${id} not found`);
    }
    return role;
  }

  async create(data: CreateRoleDto) {
    const role = await this.roleRepo.findOne({ where: { name: data.name } });
    if (role) {
      throw new NotFoundException(`Role ${data.name} already exists`);
    }
    const newRole = this.roleRepo.create(data);
    return this.roleRepo.save(newRole);
  }

  async update(id: number, data: UpdateRoleDto) {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role ${id} not found`);
    }
    this.roleRepo.merge(role, data);
    return this.roleRepo.save(role);
  }

  // remove(id: number) {
  //   return this.roleRepo.delete(id);
  // }
}
