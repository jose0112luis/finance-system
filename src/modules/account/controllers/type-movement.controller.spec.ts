import { Test, TestingModule } from '@nestjs/testing';
import { TypeMovementController } from './type-movement.controller';

describe('TypeMovementController', () => {
  let controller: TypeMovementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeMovementController],
    }).compile();

    controller = module.get<TypeMovementController>(TypeMovementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
