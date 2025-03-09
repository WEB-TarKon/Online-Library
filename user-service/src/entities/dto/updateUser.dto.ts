import { IsString, MinLength, IsEmail, IsNotEmpty, IsEnum, IsISO8601, IsOptional } from 'class-validator';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

export class UpdateUserDto {
    @IsString()
    @MinLength(1)
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsNotEmpty()
    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsISO8601()
    created_at?: Date;
}
