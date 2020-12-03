import { InputType, Field, Int, ID, PartialType, OmitType } from "@nestjs/graphql";

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

@InputType()
export class UserUpdateInput extends PartialType(OmitType(UserInput, ['id'])) {}