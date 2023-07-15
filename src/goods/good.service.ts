import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Good } from './schemas/good.schema';
import { Model } from 'mongoose';
import { GoodDto } from './dto/good.dto';
import { Direction } from '../core/models/sorting';
import { List } from '../core/models/list';

@Injectable()
export class GoodService {
  constructor(@InjectModel(Good.name) private goodModel: Model<Good>) {}

  async create(goodDto: GoodDto): Promise<Good> {
    const searchResult = await this.goodModel.find({ name: goodDto?.name.toLowerCase() }).exec();
    const isGoodAlreadyExist = Boolean(searchResult.length);
    if (isGoodAlreadyExist) {
      throw new ConflictException(`Good with name '${goodDto.name}' already exist`);
    } else {
      const good = await this.goodModel.create(goodDto);
      return good;
    }
  }

  async getAllWithPagination(
    page: number,
    limit: number,
    field: string,
    direction: Direction,
    search: string,
  ): Promise<List<GoodDto>> {
    const skip = page * limit;
    const pageSize = +limit;
    let items;
    let total;
    if (search) {
      total = await this.goodModel.find({ name: { $regex: search, $options: 'i' } }).count();
      items = await this.goodModel
        .find({ name: { $regex: search, $options: 'i' } })
        .skip(skip)
        .limit(limit)
        .sort({ [field]: direction })
        .exec();
    } else {
      total = await this.goodModel.count();
      items = await this.goodModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ [field]: direction })
        .exec();
    }
    return {
      items,
      total,
      pageSize,
      current: +page + 1,
    };
  }

  async getGood(id: string): Promise<Good> {
    const good = await this.goodModel.findById(id);
    return good;
  }

  async update(id: string, dto: GoodDto): Promise<Good> {
    const good = await this.goodModel.findByIdAndUpdate(id, dto);
    return good;
  }

  async delete(id: string): Promise<Good> {
    const deletedGood = await this.goodModel.findByIdAndDelete(id);
    if (!deletedGood) {
      throw new NotFoundException(`Good with id ${id} not found`);
    }
    return deletedGood;
  }
}
