import { InputType, Field, Int, ID } from "@nestjs/graphql";

@InputType()
export class UserInput {
    @Field(() => ID)
    readonly id!: string;
    
    @Field()
    readonly password!: string;
    
    @Field()
    readonly address!: string;    
    
    @Field(() => Int)
    readonly phoneNumber!: number;
}