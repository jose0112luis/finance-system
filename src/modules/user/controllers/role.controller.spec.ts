import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from '../services/role.service';
import { Role } from '../../../database/entities/role.entity';

describe('Role Controller', () => {
  let controller: RoleController;
  let roleService: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [RoleService],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    roleService = module.get<RoleService>(RoleService);
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const result: Role[] = [
        {
          id: 1,
          name: 'Administrator',
          createAt: new Date(),
          updateAt: new Date(),
          users: [],
        },
        {
          id: 2,
          name: 'User',
          createAt: new Date(),
          updateAt: new Date(),
          users: [],
        },
      ];

      jest
        .spyOn(roleService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a role by id', async () => {
      const result: Role = {
        id: 1,
        name: 'Administrator',
        createAt: new Date(),
        updateAt: new Date(),
        users: [],
      };

      jest
        .spyOn(roleService, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const result: Role = {
        id: 1,
        name: 'Administrator',
        createAt: new Date(),
        updateAt: new Date(),
        users: [],
      };

      jest
        .spyOn(roleService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.create({ name: 'Administrator' })).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a role by id', async () => {
      const result: Role = {
        id: 1,
        name: 'Administrator',
        createAt: new Date(),
        updateAt: new Date(),
        users: [],
      };

      jest
        .spyOn(roleService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.update(1, { name: 'Administrator' })).toBe(
        result,
      );
    });
  });
});
