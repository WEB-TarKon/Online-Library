import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pack = require('./../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.BROKER_URI || 'amqp://localhost:5672'],
      queue: pack.name, // Використовуємо назву з package.json
      queueOptions: { durable: false },
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
