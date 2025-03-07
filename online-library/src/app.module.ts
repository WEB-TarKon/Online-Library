import { Module } from '@nestjs/common';
import { UsersModule } from '@entities/users.module';
import { ConfigModule } from './config.module';
import {TypeOrmModule as NestTypeOrmModule} from "@nestjs/typeorm/dist/typeorm.module";

@Module({
  imports: [UsersModule, NestTypeOrmModule, ConfigModule]
})
export class AppModule {}
