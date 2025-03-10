import { UserService } from './user.service';
import { RegisterUserDto } from '@entities/dto/registerUser.dto';
import { UpdateUserDto } from '@entities/dto/updateUser.dto';
export declare class UserMessagingController {
    private readonly userService;
    constructor(userService: UserService);
    handleCreateUser(data: RegisterUserDto): Promise<{
        user: import("./user.entity").User;
        token: string;
    }>;
    handleFindAllUsers(): Promise<import("./user.entity").User[]>;
    handleFindUserById(data: {
        id: string;
    }): Promise<import("./user.entity").User | null>;
    handleUpdateUser(data: {
        id: string;
        dto: UpdateUserDto;
    }): Promise<{
        user: import("./user.entity").User | null;
        message: string;
    }>;
    handleDeleteUser(data: {
        id: string;
    }): Promise<import("typeorm").DeleteResult>;
    handleFindUserByEmail(data: {
        email: string;
    }): Promise<import("./user.entity").User | null>;
    handleResetPassword(data: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    handleAuthVerify(data: {
        token: string;
    }): Promise<{
        userId: any;
        role: any;
        email: any;
    }>;
}
