import { Body, Controller, Post } from '@nestjs/common';
import { Store } from '@src/entities/store.entity';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post('/register')
    async storeRegister(@Body() store: Store) {
        return await this.storeService.createStore(store);
    }
}
