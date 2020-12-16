import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/auth/auth.module';
import { StoreModule } from './store.module';
import { StoreResolver } from './store.resolver';

let resolver: StoreResolver;

describe('StoreResolver', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        forwardRef(() => AuthModule),
        StoreModule
      ],
      providers: [StoreResolver],
    }).compile();

    resolver = module.get<StoreResolver>(StoreResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});