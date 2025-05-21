import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  try {
    console.log('Environment variables:');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    console.log('PORT:', process.env.PORT);
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);

    const app = await NestFactory.create(AppModule, new ExpressAdapter(express()));
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await app.listen(process.env.PORT || 7080, () => console.log('Server successfully started on port 7080'));
  } catch (e) {
    console.log('Error:', e);
  }
}
bootstrap();
