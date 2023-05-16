import { Test, TestingModule } from '@nestjs/testing';
import { BetaService } from './beta.service';

describe('BetaService', () => {
  let service: BetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BetaService],
    }).compile();

    service = module.get<BetaService>(BetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
