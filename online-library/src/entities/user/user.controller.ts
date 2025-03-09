import { Controller, Get, Post, Req, Res, Put, Delete, Param, Body, UseGuards, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from '@entities/user/user.service';
import { UpdateUserDto } from '@entities/dto/updateUser.dto';
import { RegisterUserDto } from '@entities/dto/registerUser.dto';
import { LoginUserDto } from '@entities/dto/loginUser.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    async registerUser(@Body() body: RegisterUserDto, @Res() res: Response) {
        const result = await this.userService.registerUser(body);
        return res.send({
            status: 'ok',
            data: result,
        });
    }

    @Post('/login')
    async loginUser(@Body() body: LoginUserDto, @Res() res: Response) {
        const result = await this.userService.loginUser(body);
        return res.send({
            status: 'ok',
            data: result,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getAllUsers(@Req() req: Request, @Res() res: Response) {
        const currentUser = req.user as { userId: string; role: string };
        if (currentUser.role !== 'admin') {
            throw new ForbiddenException('Only admin can get all users');
        }

        const users = await this.userService.getAllUsers();
        return res.send({
            status: 'ok',
            data: users,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getUser(
        @Param('id') id: string,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const currentUser = req.user as { userId: string; role: string };
        if (currentUser.role !== 'admin' && currentUser.userId !== id) {
            throw new ForbiddenException('You cannot get data of another user');
        }

        const userData = await this.userService.getUserData(id);
        if (!userData) {
            throw new NotFoundException('User not found');
        }

        return res.send({
            status: 'ok',
            data: userData,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const currentUser = req.user as { userId: string; role: string };
        const { user: updatedUser, message } = await this.userService.updateUserData(
            id,
            body,
            currentUser,
        );

        return res.send({
            status: 'ok',
            data: updatedUser,
            message,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteUser(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        const currentUser = req.user as { userId: string; role: string };

        if (currentUser.role !== 'admin' && currentUser.userId !== id) {
            throw new ForbiddenException('You can delete only yourself (or be admin).');
        }

        await this.userService.deleteUser(id);
        return res.send({ status: 'ok' });
    }
}
