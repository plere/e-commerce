import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
@ObjectType('cartoutput', {isAbstract: true})
export class CartInput {    
    @Field(() => Int, {nullable: false})
    item_number: number;
    
    @Field(() => Int, {nullable: false})
    cart_count: number;
}


