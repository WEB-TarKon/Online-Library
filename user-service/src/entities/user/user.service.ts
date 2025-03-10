import { Injectable, BadRequestException, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './user.entity';
import { UpdateUserDto } from '@entities/dto/updateUser.dto';
import { RegisterUserDto } from '@entities/dto/registerUser.dto';
import { LoginUserDto } from '@entities/dto/loginUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    private credentialsMap = new Map<string, string>();

    availableFields = ['name', 'email', 'role', 'created_at'];

    private updateUserEmail(userInDb: User, newEmail: string): void {
        if (newEmail && newEmail !== userInDb.email) {
            const oldEmail = userInDb.email;
            const oldHashed = this.credentialsMap.get(oldEmail);
            if (oldHashed) {
                this.credentialsMap.delete(oldEmail);
                this.credentialsMap.set(newEmail, oldHashed);
            }
            userInDb.email = newEmail;
        }
    }

    public async registerUser(userData: RegisterUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        this.credentialsMap.set(userData.email, hashedPassword);

        const newUser = this.userRepository.create({
            name: userData.name,
            email: userData.email,
            role: userData.role || 'user',
        });
        const savedUser = await this.userRepository.save(newUser);

        const payload = {
            sub: savedUser.id,
            role: savedUser.role,
            email: savedUser.email,
        };
        const token = this.jwtService.sign(payload);

        return {
            user: savedUser,
            token,
        };
    }

    public async loginUser(loginData: LoginUserDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginData.email },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const hashedPassword = this.credentialsMap.get(loginData.email);
        if (!hashedPassword) {
            throw new UnauthorizedException('Credentials not found for this user');
        }

        const isMatch = await bcrypt.compare(loginData.password, hashedPassword);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = {
            sub: user.id,
            role: user.role,
            email: user.email,
        };
        const token = this.jwtService.sign(payload);

        return {
            message: 'Login successful',
            token,
        };
    }

    public async getAllUsers() {
        return this.userRepository.find({
            select: this.availableFields as any,
        });
    }

    public async getUserData(id: string) {
        return this.userRepository.findOne({
            where: { id },
            select: this.availableFields as any,
        });
    }

    public async updateUserData(
        targetUserId: string,
        body: UpdateUserDto,
        currentUser: { userId: string; role: string },
    ) {
        const userInDb = await this.userRepository.findOne({
            where: { id: targetUserId },
        });
        if (!userInDb) {
            throw new NotFoundException('User not found');
        }

        let infoMessage = '';

        if (currentUser.role === 'admin') {
            if (currentUser.userId === userInDb.id) {
                if (body.email) {
                    this.updateUserEmail(userInDb, body.email);
                }
                if (body.name) {
                    userInDb.name = body.name;
                }
                if (body.role && body.role !== userInDb.role) {
                    userInDb.role = body.role;
                }
            } else {
                if (body.name || body.email) {
                    infoMessage =
                        'Admin can only update role for other users. Name and email fields were ignored.';
                }
                if (body.role) {
                    userInDb.role = body.role;
                }
            }
        } else {
            if (currentUser.userId !== userInDb.id) {
                throw new ForbiddenException('You cannot update another user');
            }
            if (body.role && body.role !== userInDb.role) {
                throw new ForbiddenException('You cannot change your role');
            }
            if (body.name) {
                userInDb.name = body.name;
            }
            if (body.email) {
                this.updateUserEmail(userInDb, body.email);
            }
        }

        await this.userRepository.save(userInDb);

        const updatedUser = await this.userRepository.findOne({
            where: { id: targetUserId },
            select: this.availableFields as any,
        });

        return { user: updatedUser, message: infoMessage };
    }

    public async deleteUser(id: string) {
        const userInDb = await this.userRepository.findOne({ where: { id } });
        if (userInDb) {
            this.credentialsMap.delete(userInDb.email);
        }
        return this.userRepository.delete(id);
    }

    public async getUserByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email },
            select: this.availableFields as any,
        });
    }

    public async verifyToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            return { userId: payload.sub, role: payload.role, email: payload.email };
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
