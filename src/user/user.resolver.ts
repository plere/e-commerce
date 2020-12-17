import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@src/entities/user.entity';
import { UserInput, UserUpdateInput } from './user.input';
import { UserService } from './user.service';
import graphqlTypeJson from 'graphql-type-json'
import { forwardRef, Inject } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';

@Resolver()
export class UserResolver {
    constructor(        
        private readonly userService: UserService,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService
    ) { }

    @Query(() => [User])
    async getUsers() {
        return this.userService.getUsers();
    }
    
    @Mutation(() => Boolean) 
    async createUser(@Args({name: 'userInput', type : () => UserInput}) bodyData: UserInput) {
        if(await this.userService.createUser(bodyData)) {
            return true;
        }
        else {
            throw new Error('check id or phoneNumber');
        }
    }

    @Mutation(() => Boolean)
    async updateUser(@Args({name: 'id', type: () => ID}) id: string,
    @Args({name: 'updateInfo', type: () => UserUpdateInput}) updateInfo: UserUpdateInput) {
        if(await this.userService.updateUser(id, updateInfo))
            return true;
        else
            throw new Error('check phoneNumber');
    }    

    @Mutation(() => graphqlTypeJson)
    async userLogin(@Args({name: 'id', type: () => String}) id: string, @Args({name: 'password', type: () => String}) pwd: string) {
        if(await this.authService.validateUser(id, pwd))
            return await this.authService.userLogin(id, pwd);
        else 
            throw new Error('check user id or password');
    }

    async userRemove(id: string, pwd: string) {
        return await this.userService.remove(id, pwd);
    }

    async getUser(id: string) {
        return await this.userService.findOne(id);
    }
}
