import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: 'USER_SERVICE',
            useFactory: () =>
                ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [process.env.BROKER_URI || 'amqp://localhost:5672'],
                        queue: 'user-service',
                        queueOptions: { durable: false },
                    },
                }),
        },
    ],
})
export class UserModule {}
