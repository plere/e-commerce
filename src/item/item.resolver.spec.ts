import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item.module';
import { ItemResolver } from './item.resolver';

describe('ItemResolver', () => {
  let resolver: ItemResolver;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),        
        ItemModule
      ],
      providers: [ItemResolver],
    }).compile();

    resolver = module.get<ItemResolver>(ItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
