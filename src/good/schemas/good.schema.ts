import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GoodDocument = HydratedDocument<Good>;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Good {
  id: string;

  @Prop()
  shopId: number;

  @Prop()
  name: string;

  @Prop()
  imageUrl: string;

  @Prop()
  price: number;
}

export const GoodSchema = SchemaFactory.createForClass(Good);
GoodSchema.virtual('id').get(function (this: GoodDocument) {
  return this._id.toHexString();
});