import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../core/strategy/jwt.strategy';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { Purchase, PurchaseSchema } from './schemas/purchase.schema';
import { Good, GoodSchema } from '../goods/schemas/good.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Purchase.name, schema: PurchaseSchema },
      { name: Good.name, schema: GoodSchema },
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService, JwtStrategy],
})
export class PurchaseModule {}
