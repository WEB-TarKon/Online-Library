import {Controller, Get, Post, Req, Res, Put, Delete, Param, Body} from '@nestjs/common';
import {Response, Request} from 'express';
import {UserService} from "@entities/user/user.service";
import {UpdateUserDto} from "@entities/dto/updateUser.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get('/')
    async getAllUsers(
        @Res() res: Response,
    ) {
        const users = await this.userService.getAllUsers()

        return res.send({
            status: 'ok',
            data: users
        })
    }

    @Get('/:id')
    async getUser(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        const userData = await this.userService.getUserData(id);

        return res.send({
            status: 'ok',
            data: userData
        })
    }

    @Post('/')
    async createUser(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        await this.userService.createUser(req.body)
        return res.send({status: 'ok'});
    }

    @Put('/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserDto,
        @Res() res: Response,
    ) {
        await this.userService.updateUserData(id, body)
        return res.send({status: 'ok'});
    }

    @Delete('/:id')
    async deleteUser(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        await this.userService.deleteUser(id)
        return res.send({status: 'ok'});
    }
}