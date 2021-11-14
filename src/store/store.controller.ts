import { Body, Controller, forwardRef, Get, HttpStatus, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { AuthService } from '@src/auth/auth.service';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';
import { Store } from '@src/entities/store.entity';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService) {}

    @Post('/register')
    async storeRegister(@Body() store: Store, @Res() res) {
        const newStore = await this.storeService.createStore(store);
        if(!newStore) {
            return res.status(HttpStatus.CONFLICT).send();
        }
        let {access_token} = await this.authService.storeLogin(newStore.store_name, newStore.password);
        return res.json({
            store_name: newStore.store_name,
            access_token
        });
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/check')
    storeCheck(@Context() ctx, @Res() res) {
        return res.json({
            store_name: ctx.req.user.id,
            isStore: ctx.req.user.isStore
        });
    }
}
