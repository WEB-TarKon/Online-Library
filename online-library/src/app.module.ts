import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@db/typeorm.module";
import {UserModule} from '@entities/user/user.module';
import {ConfigModule} from "@nestjs/config";


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule,
        UserModule
    ]
})
export class AppModule {
}