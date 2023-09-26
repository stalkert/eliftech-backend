import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
import { Good } from '../../goods/schemas/good.schema';

@Schema()
export class Purchase {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: [
      {
        good: { type: mongoose.Schema.Types.ObjectId, ref: 'Good' },
        checked: { type: Boolean, default: false },
      },
    ],
  })
  goods: { good: Good; checked: boolean }[];
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
