import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Good } from './schemas/good.schema';
import { Model } from 'mongoose';
import { GoodDto, GoodType } from './dto/good.dto';
import { Direction } from '../core/models/sorting';
import { List } from '../core/models/list';
import { isNil } from '@nestjs/common/utils/shared.utils';

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
    goodType: GoodType,
  ): Promise<List<GoodDto>> {
    const skip = page * limit;
    const pageSize = +limit;
    const isMeal = goodType && goodType === GoodType.Meal ? true : undefined;
    let items;

    if (search) {
      const filterWithSearch = !isNil(isMeal)
        ? { name: { $regex: search, $options: 'i' }, isMeal }
        : { name: { $regex: search, $options: 'i' } };
      items = await this.goodModel
        .find(filterWithSearch)
        .skip(skip)
        .limit(limit)
        .sort({ [field]: direction })
        .exec();
    } else {
      items = await this.goodModel
        .find(!isNil(isMeal) ? { isMeal } : undefined)
        .skip(skip)
        .limit(limit)
        .sort({ [field]: direction })
        .exec();
    }
    return {
      items,
      total: items.length,
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
