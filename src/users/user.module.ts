import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { HashService } from 'src/users/hash.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/core/strategy/jwt.strategy';
import { LocalStrategy } from 'src/core/strategy/local.strategy';
import { secret } from '../core/constants/jwt-secret';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn: '60d',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, HashService, AuthService, JwtStrategy, LocalStrategy],
})
export class UserModule {}
