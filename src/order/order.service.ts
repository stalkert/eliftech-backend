import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./schemas/order.schema";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private goodModel: Model<Order>) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const order = await this.goodModel.create(dto);
    return order;
  }
}
