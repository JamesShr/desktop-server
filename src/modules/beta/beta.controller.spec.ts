import { Test, TestingModule } from '@nestjs/testing';
import { BetaController } from './beta.controller';

describe('BetaController', () => {
  let controller: BetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BetaController],
    }).compile();

    controller = module.get<BetaController>(BetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
