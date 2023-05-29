import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Good } from "./schemas/good.schema";
import { Model } from "mongoose";
import { CreateGoodDto, GoodDtoOut } from "./dto/create-good.dto";

@Injectable()
export class GoodService {
  constructor(@InjectModel(Good.name) private goodModel: Model<Good>) {}

  async create(dto: CreateGoodDto): Promise<Good> {
    const good = await this.goodModel.create(dto);
    return good;
  }
  async getAllByShopIdWithPagination(shopId: number, page: number, limit: number): Promise<GoodDtoOut[]> {
    const skip = (page - 1) * limit;
    const goods = await this.goodModel.find({shopId}).skip(skip).limit(limit).exec();
    return goods;
  }
}
