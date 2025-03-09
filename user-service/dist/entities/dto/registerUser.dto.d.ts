import { UserRole } from './updateUser.dto';
export declare class RegisterUserDto {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}
