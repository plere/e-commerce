import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { forwardRef } from '@nestjs/common';
import { UserModule } from '@src/user/user.module';
import { StoreModule } from '@src/store/store.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UserModule),
        forwardRef(() => StoreModule),
        JwtModule.register({
          secret: 'secretTemp',
          signOptions: {expiresIn: '180s'}
        }),
        TypeOrmModule.forRoot(),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});