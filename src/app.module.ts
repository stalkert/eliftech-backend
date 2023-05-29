import { Module } from '@nestjs/common';
import { GoodModule } from "./good/good.module";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://stalkert:Kolokol2968221473@cluster7.u4tisjj.mongodb.net/?retryWrites=true&w=majority'),
    GoodModule,
    OrderModule
  ],
})
export class AppModule {}
