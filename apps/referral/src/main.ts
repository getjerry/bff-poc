import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ReflectionService } from '@grpc/reflection';
import { AppModule } from './app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5002',
      package: 'referral',
      protoPath: join(__dirname, 'referral.proto'),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await app.listen();
  Logger.log(`🚀 Referral microservice is running`);
}

bootstrap();
