import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { User } from '../../../database/entities/user.entity';
import { Role } from 'src/database/entities/role.entity';
import { Account } from 'src/database/entities/account.entity';
import { Movement } from 'src/database/entities/movement.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    @InjectRepository(Movement) private movementRepo: Repository<Movement>,
  ) {}

  async findAll() {
    const users = await this.userRepo.find();
    if (users.length === 0) {
      throw new NotFoundException('No Registered Users Yet');
    }
    return users;
  }

  // async findOne(id: number) {
  //   const user = await this.userRepo.findOne({
  //     where: { id },
  //     relations: ['roles'],
  //   });
  //   if (!user) {
  //     throw new NotFoundException(`User ${id} not found`);
  //   }
  //   return user;
  // }

  async findOne(cedula: string) {
    const user = await this.userRepo.findOne({
      where: { identificationCard: cedula },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User ${cedula} not found`);
    }
    return user;
  }

  async findAccountsByUser(cedula: string) {
    const user = await this.userRepo.findOne({
      where: { identificationCard: cedula },
      relations: ['accounts', 'accounts.typeAccount'],
    });
    if (!user) {
      throw new NotFoundException(`User ${cedula} not found`);
    }
    return user;
  }

  async findMovementsByAccountByUser(cedula: string, idAccount: string) {
    const user = await this.userRepo.findOne({
      where: { identificationCard: cedula },
    });

    const account = await this.accountRepo.findOne({
      where: {
        accountNumber: idAccount,
        user: { identificationCard: cedula },
      },
    });
    if (!user || !account) {
      throw new NotFoundException(`User or Account does not exist`);
    }

    const movements = await this.movementRepo.find({
      where: {
        account: { accountNumber: idAccount },
      },
      relations: [
        'typeMovement',
        'account',
        'account.typeAccount',
        'account.user',
      ],
    });
    if (movements.length === 0) {
      throw new NotFoundException('No Registered Movements yet');
    }
    return movements;
  }

  async create(data: CreateUserDto) {
    const user = await this.userRepo.findOne({
      where: { identificationCard: data.identificationCard },
    });
    if (user) {
      throw new NotFoundException(
        `User ${data.identificationCard} already exists`,
      );
    }
    const newUser = this.userRepo.create(data);
    if (data.rolesIds) {
      const roles = await this.roleRepo.find({
        where: { id: In(data.rolesIds) }, // In permite recibir un array de number
      });
      if (roles.length === 0) {
        throw new NotFoundException("User Roles Don't exist");
      }
      newUser.roles = roles;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User ${id} not fount`);
    }
    if (data.rolesIds) {
      const roles = await this.roleRepo.find({
        where: { id: In(data.rolesIds) },
      });
      if (roles.length === 0) {
        throw new NotFoundException("User Roles Don't exist");
      }
      user.roles = roles;
    }
    return this.userRepo.save(user);
  }

  // remove(id: number) {
  //   return this.userRepo.delete(id);
  // }
}
