import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserInput } from './user.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor( 
        private readonly userService: UserService,
    ) { }
    @Query(() => [User])
    async getUser() {
        return this.userService.getUser();
    }
    
    @Mutation(() => Boolean) 
    async createUser(@Args({name: 'userInput', type : () => UserInput}) bodyData: UserInput) {
        console.log(bodyData);
        if(await this.userService.createUser(bodyData)) {
            return true;
        }
        else {
            throw new Error('check id or phoneNumber');
        }
    }
}
