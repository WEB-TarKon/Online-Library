import {IsString, MinLength, IsEmail, IsNotEmpty, IsEnum, IsISO8601} from 'class-validator';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export class UpdateUserDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

    @IsISO8601()
    created_at: Date;
}
