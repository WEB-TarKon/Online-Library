"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    credentialsMap = new Map();
    availableFields = ['name', 'email', 'role', 'created_at'];
    updateUserEmail(userInDb, newEmail) {
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
    async registerUser(userData) {
        const existingUser = await this.userRepository.findOne({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
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
    async loginUser(loginData) {
        const user = await this.userRepository.findOne({
            where: { email: loginData.email },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const hashedPassword = this.credentialsMap.get(loginData.email);
        if (!hashedPassword) {
            throw new common_1.UnauthorizedException('Credentials not found for this user');
        }
        const isMatch = await bcrypt.compare(loginData.password, hashedPassword);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid password');
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
    async getAllUsers() {
        return this.userRepository.find({
            select: this.availableFields,
        });
    }
    async getUserData(id) {
        return this.userRepository.findOne({
            where: { id },
            select: this.availableFields,
        });
    }
    async updateUserData(targetUserId, body, currentUser) {
        const userInDb = await this.userRepository.findOne({
            where: { id: targetUserId },
        });
        if (!userInDb) {
            throw new common_1.NotFoundException('User not found');
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
            }
            else {
                if (body.name || body.email) {
                    infoMessage =
                        'Admin can only update role for other users. Name and email fields were ignored.';
                }
                if (body.role) {
                    userInDb.role = body.role;
                }
            }
        }
        else {
            if (currentUser.userId !== userInDb.id) {
                throw new common_1.ForbiddenException('You cannot update another user');
            }
            if (body.role && body.role !== userInDb.role) {
                throw new common_1.ForbiddenException('You cannot change your role');
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
            select: this.availableFields,
        });
        return { user: updatedUser, message: infoMessage };
    }
    async deleteUser(id) {
        const userInDb = await this.userRepository.findOne({ where: { id } });
        if (userInDb) {
            this.credentialsMap.delete(userInDb.email);
        }
        return this.userRepository.delete(id);
    }
    async getUserByEmail(email) {
        return this.userRepository.findOne({
            where: { email },
            select: this.availableFields,
        });
    }
    async verifyToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            return { userId: payload.sub, role: payload.role, email: payload.email };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map