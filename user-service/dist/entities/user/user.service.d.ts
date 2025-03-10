import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { UpdateUserDto } from '@entities/dto/updateUser.dto';
import { RegisterUserDto } from '@entities/dto/registerUser.dto';
import { LoginUserDto } from '@entities/dto/loginUser.dto';
export declare class UserService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    private credentialsMap;
    availableFields: string[];
    private updateUserEmail;
    registerUser(userData: RegisterUserDto): Promise<{
        user: User;
        token: string;
    }>;
    loginUser(loginData: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
    getAllUsers(): Promise<User[]>;
    getUserData(id: string): Promise<User | null>;
    updateUserData(targetUserId: string, body: UpdateUserDto, currentUser: {
        userId: string;
        role: string;
    }): Promise<{
        user: User | null;
        message: string;
    }>;
    deleteUser(id: string): Promise<import("typeorm").DeleteResult>;
    getUserByEmail(email: string): Promise<User | null>;
    verifyToken(token: string): Promise<{
        userId: any;
        role: any;
        email: any;
    }>;
}
