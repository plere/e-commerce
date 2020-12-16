import { forwardRef, Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreResolver } from './store.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '@src/entities/store.entity';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store]),
    forwardRef(() => AuthModule)
],
  providers: [StoreService, StoreResolver],
  exports: [StoreService]
})
export class StoreModule {}
