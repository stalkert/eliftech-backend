import { Module } from '@nestjs/common';
import { GoodController } from "./good.controller";
import { GoodService } from "./good.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Good, GoodSchema } from "./schemas/good.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Good.name, schema: GoodSchema }])],
  controllers: [GoodController],
  providers: [GoodService],
})
export class GoodModule {}
