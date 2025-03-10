import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { RegisterUserDto } from '@entities/dto/registerUser.dto';
import { UpdateUserDto } from '@entities/dto/updateUser.dto';

@Controller()
export class UserMessagingController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: 'create_user' })
    async handleCreateUser(@Payload() data: RegisterUserDto) {
        return await this.userService.registerUser(data);
    }

    @MessagePattern({ cmd: 'find_all_users' })
    async handleFindAllUsers() {
        return await this.userService.getAllUsers();
    }

    @MessagePattern({ cmd: 'find_user_by_id' })
    async handleFindUserById(@Payload() data: { id: string }) {
        return await this.userService.getUserData(data.id);
    }

    @MessagePattern({ cmd: 'update_user' })
    async handleUpdateUser(@Payload() data: { id: string, dto: UpdateUserDto }) {
        return await this.userService.updateUserData(data.id, data.dto, { userId: data.id, role: 'admin' });
    }

    @MessagePattern({ cmd: 'delete_user' })
    async handleDeleteUser(@Payload() data: { id: string }) {
        return await this.userService.deleteUser(data.id);
    }

    @MessagePattern({ cmd: 'find_user_by_email' })
    async handleFindUserByEmail(@Payload() data: { email: string }) {
        return await this.userService.getUserByEmail(data.email);
    }

    @MessagePattern({ cmd: 'reset_password' })
    async handleResetPassword(@Payload() data: { email: string }) {
        // Функціонал скидання пароля не реалізовано
        return { message: 'Reset password functionality not implemented' };
    }

    @MessagePattern({ cmd: 'auth.verify' })
    async handleAuthVerify(@Payload() data: { token: string }) {
        return await this.userService.verifyToken(data.token);
    }
}
