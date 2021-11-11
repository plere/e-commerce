import { Controller, Get } from '@nestjs/common';
import { Item } from '@src/entities/item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get()
    async allItemList() {        
        return await this.itemService.findAll();
    }

}
