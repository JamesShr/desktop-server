import { Test, TestingModule } from '@nestjs/testing';
import { AlphaService } from './alpha.service';

describe('AlphaService', () => {
  let service: AlphaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlphaService],
    }).compile();

    service = module.get<AlphaService>(AlphaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
