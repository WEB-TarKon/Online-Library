import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from './user.entity';
import { UserController } from '@entities/user/user.controller';
import { UserMessagingController } from '@entities/user/user.messaging.controller';
import { UserService } from './user.service';
import { JwtStrategy } from '../../auth/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKey',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [UserController, UserMessagingController],
    providers: [UserService, JwtStrategy],
    exports: [UserService],
})
export class UserModule {}
