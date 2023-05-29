import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { GoodService } from "./good.service";
import { CreateGoodDto } from "./dto/create-good.dto";
import { Good } from "./schemas/good.schema";

@Controller('/api/shops/:id/goods')
export class GoodController {
  constructor(private goodService: GoodService) {}

  @Post()
  createGood(@Param('id') id, @Body() goodDto: CreateGoodDto): Promise<Good> {
    return this.goodService.create({...goodDto, shopId: Number(id)});
  }

  @Get()
  getAllByShopIdWithPagination(@Param('id') id: string, @Query('page') page: number, @Query('limit') limit: number): Promise<Good[]> {
    return this.goodService.getAllByShopIdWithPagination(Number(id),page, limit);
  }
}
