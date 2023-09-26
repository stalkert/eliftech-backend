import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase } from './schemas/purchase.schema';
import { Good } from '../goods/schemas/good.schema';
import { PurchaseGoodItem } from './dto/purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
    @InjectModel(Good.name) private goodModel: Model<Good>,
  ) {}

  async getPurchase(userId: string): Promise<PurchaseGoodItem[]> {
    const searchResult = await this.purchaseModel.find({ user: userId }).populate('goods.good').exec();
    if (Array.isArray(searchResult) && searchResult.length === 0) {
      const purchase = new this.purchaseModel({
        user: userId,
        goods: [],
      });
      return (await purchase.save()).goods;
    }
    return searchResult[0].goods;
  }

  async addGoodToPurchase(userId: string, goodId: string): Promise<Purchase> {
    const searchResult = await this.purchaseModel.find({ user: userId });
    searchResult[0].goods.push({ good: new this.goodModel({ _id: goodId }), checked: false });
    return await searchResult[0].save();
  }

  async update(userId: string, goodId: string): Promise<Purchase> {
    const searchResult = await this.purchaseModel.find({ user: userId });
    searchResult[0].goods = searchResult[0].goods.map(({ good, checked }: any) => {
      if (good._id.toHexString() === goodId) {
        return { good, checked: !checked };
      }
      return { good, checked };
    });
    return await searchResult[0].save();
  }

  async delete(userId: string, goodId: string): Promise<Purchase> {
    const searchResult = await this.purchaseModel.find({ user: userId });
    searchResult[0].goods = searchResult[0].goods.filter(({ good }: any) => {
      return good._id.toHexString() !== goodId;
    });
    return await searchResult[0].save();
  }
}
