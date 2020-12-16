import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StoreService } from '@src/store/store.service';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthService {
    constructor(    
        @Inject(forwardRef(() => UserService)) private userService: UserService,  
        @Inject(forwardRef(() => StoreService)) private storeService: StoreService,
        private jwtService: JwtService
    ) {}

    async validateUser(name: string, pwd: string): Promise<any> {
        const user = await this.userService.findOne(name);
        if (user && user.password === pwd) {
            return {id: name, pwd: pwd, isStore: false};
        }
        return null;
    }

    async userLogin(name: string, pwd: string) {        
        const payload = { id: name, pwd: pwd, isStore: false };
        return {
        access_token: await this.jwtService.sign(payload),
        };
    }

    async validateStore(name: string, pwd: string): Promise<any> {
        const store = await this.storeService.findOne(name);
        if (store && store.password === pwd) {
            return {id: name, pwd: pwd, isStore: true};
        }
        return null;
    }

    async storeLogin(name: string, pwd: string) {        
        const payload = {id: name, pwd: pwd, isStore: true};
        return {
            access_token: await this.jwtService.sign(payload)
        };
    }
}