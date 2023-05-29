import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./schemas/order.schema";

@Controller('/api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder( @Body() orderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(orderDto);
  }
}
