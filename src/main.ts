import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from 'express';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(express()),);
    app.enableCors();
    await app.listen(6080, ()=> console.log('Server successfully started on port 6080'));
  }catch(e){
    console.log(e);
  }

}
bootstrap();
