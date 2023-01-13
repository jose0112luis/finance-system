import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { User } from '../../../database/entities/user.entity';
import { Role } from 'src/database/entities/role.entity';
import { Account } from 'src/database/entities/account.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findAccountsByUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['accounts', 'accounts.typeAccount'],
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findMovementsByAccountByUser(idUser: number, idAccount: number) {
    const user = await this.userRepo.findOne({
      where: { id: idUser },
    });
    const account = await this.accountRepo.findOne({
      where: {
        id: idAccount,
        user: { id: idUser },
      },
    });
    if (!user || !account) {
      throw new NotFoundException(`User or Account does not exist`);
    }
    const movements = await this.accountRepo.findOne({
      where: { id: idAccount, user: Equal(idUser) },
      relations: ['typeAccount', 'user', 'movements', 'movements.typeMovement'],
    });
    return movements;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if (data.rolesIds) {
      const roles = await this.roleRepo.find({
        where: { id: In(data.rolesIds) }, // In permite recibir un array de number
      });
      newUser.roles = roles;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (data.rolesIds) {
      const roles = await this.roleRepo.find({
        where: { id: In(data.rolesIds) },
      });
      user.roles = roles;
    }
    return this.userRepo.save(user);
  }

  // remove(id: number) {
  //   return this.userRepo.delete(id);
  // }
}
