import { Test, TestingModule } from '@nestjs/testing';
import { TypeAccountService } from './type-account.service';

describe('TypeAccountService', () => {
  let service: TypeAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeAccountService],
    }).compile();

    service = module.get<TypeAccountService>(TypeAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
