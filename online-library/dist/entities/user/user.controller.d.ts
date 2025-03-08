import { Response, Request } from 'express';
import { UserService } from "@entities/user/user.service";
import { UpdateUserDto } from "@entities/dto/updateUser.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(res: Response): Promise<Response<any, Record<string, any>>>;
    getUser(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(id: string, body: UpdateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
