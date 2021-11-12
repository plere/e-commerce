import { InputType, Field, ID, PartialType, OmitType } from "@nestjs/graphql";

@InputType()
export class StoreInput {
    @Field(() => ID)
    readonly store_name!: string;
    
    @Field()
    readonly password!: string;

    @Field()
    readonly password_confirm: string;

    @Field()
    readonly store_email: string;

    @Field()
    readonly store_tel: string;
    
    @Field({nullable: true})
    readonly store_description?: string;
}

@InputType()
export class StoreUpdateInput extends PartialType(OmitType(StoreInput, ['store_name'])) {}