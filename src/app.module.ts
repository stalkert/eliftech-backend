import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './core/utils/logger.middlware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './core/guards/roles.guard';
import { GoodModule } from './goods/good.module';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './core/constants/jwt-secret';
import { PurchaseModule } from './purchases/purchase.module';
import { FridgeModule } from './fridge/fridge.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '60d',
      },
    }),
    UserModule,
    AuthModule,
    GoodModule,
    PurchaseModule,
    FridgeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
