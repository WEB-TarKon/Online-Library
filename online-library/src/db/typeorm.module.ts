import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        NestTypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DATABASE,
            entities: [ 'dist/entities/**/*.entity.js' ],
            synchronize: true
        })
    ]
})
export class TypeOrmModule {}