import { InputType, Field, Int, ID } from "@nestjs/graphql";

@InputType()
export class ItemInput {    
    @Field()
    readonly item_name!: string;

    @Field(() => Int)
    readonly stock_count!: number;

    @Field(() => Int)
    readonly item_price!: number;

    @Field({nullable: true})
    readonly item_description?: string;
}
