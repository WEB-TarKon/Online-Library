import { Module } from '@nestjs/common';
import { UsersModule } from '@entities/users.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { ConfigModule } from './config.module';

@Module({
  imports: [UsersModule, TypeOrmModule, ConfigModule]
})
export class AppModule {}
