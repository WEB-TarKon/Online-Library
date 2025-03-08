import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from "@entities/dto/updateUser.dto";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    availableFields: string[];
    private filterFields;
    createUser(userData: any): Promise<User[]>;
    getAllUsers(): Promise<User[]>;
    getUserData(id: string): Promise<User | null>;
    updateUserData(id: string, body: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUser(id: string): Promise<import("typeorm").DeleteResult>;
}
