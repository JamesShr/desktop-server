import { Test, TestingModule } from '@nestjs/testing';
import { AlphaController } from './alpha.controller';

describe('AlphaController', () => {
  let controller: AlphaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlphaController],
    }).compile();

    controller = module.get<AlphaController>(AlphaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
