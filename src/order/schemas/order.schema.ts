import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Customer, OrderGoodDto } from "../dto/create-order.dto";

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Order {
  id: string;

  @Prop()
  customer: Customer;

  @Prop()
  cartGoods: OrderGoodDto[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.virtual('id').get(function (this: OrderDocument) {
  return this._id.toHexString();
});