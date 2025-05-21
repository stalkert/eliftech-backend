import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../core/strategy/jwt.strategy';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { Fridge, FridgeSchema } from './schemas/fridge.schema';
import { Good, GoodSchema } from '../goods/schemas/good.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Fridge.name, schema: FridgeSchema },
      { name: Good.name, schema: GoodSchema },
    ]),
  ],
  controllers: [FridgeController],
  providers: [FridgeService, JwtStrategy],
})
export class FridgeModule {}
