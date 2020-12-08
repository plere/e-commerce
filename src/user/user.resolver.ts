import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserInput, UserUpdateInput } from './user.input';
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
}
