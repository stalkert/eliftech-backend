import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fridge } from './schemas/fridge.schema';
import { Good } from '../goods/schemas/good.schema';
import { FridgeGoodItem } from './dto/fridge.dto';

@Injectable()
export class FridgeService {
  constructor(
    @InjectModel(Fridge.name) private fridgeModel: Model<Fridge>,
    @InjectModel(Good.name) private goodModel: Model<Good>,
  ) {}

  async getGoodsInFridge(userId: string): Promise<FridgeGoodItem[]> {
    const searchResult = await this.fridgeModel.find({ user: userId }).populate('goods.good').exec();
    if (Array.isArray(searchResult) && searchResult.length === 0) {
      const fridge = new this.fridgeModel({
        user: userId,
        goods: [],
      });
      return (await fridge.save()).goods;
    }
    return searchResult[0].goods;
  }

  async addGoodToFridge(userId: string, goodId: string): Promise<Fridge> {
    const searchResult = await this.fridgeModel.find({ user: userId });
    searchResult[0].goods.push({ good: new this.goodModel({ _id: goodId }), checked: false });
    return await searchResult[0].save();
  }

  async update(userId: string, goodId: string): Promise<Fridge> {
    const searchResult = await this.fridgeModel.find({ user: userId });
    searchResult[0].goods = searchResult[0].goods.map(({ good, checked }: any) => {
      if (good._id.toHexString() === goodId) {
        return { good, checked: !checked };
      }
      return { good, checked };
    });
    return await searchResult[0].save();
  }

  async delete(userId: string, goodId: string): Promise<Fridge> {
    const searchResult = await this.fridgeModel.find({ user: userId });
    searchResult[0].goods = searchResult[0].goods.filter(({ good }: any) => {
      return good._id.toHexString() !== goodId;
    });
    return await searchResult[0].save();
  }
}
