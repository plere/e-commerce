import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StoreModule } from 'src/store/store.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [    
    JwtModule.register({
      secret: 'secretTemp',
      signOptions: {expiresIn: '180s'}
    }),
    PassportModule,
    forwardRef(() => StoreModule)
  ],  
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
