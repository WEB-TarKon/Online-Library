import { Response, Request } from 'express';
import { UserService } from '@entities/user/user.service';
import { UpdateUserDto } from '@entities/dto/updateUser.dto';
import { RegisterUserDto } from '@entities/dto/registerUser.dto';
import { LoginUserDto } from '@entities/dto/loginUser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(body: RegisterUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    loginUser(body: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUser(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(id: string, body: UpdateUserDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(id: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
