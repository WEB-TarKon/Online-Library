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
exports.UserMessagingController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const user_service_1 = require("./user.service");
const registerUser_dto_1 = require("../dto/registerUser.dto");
let UserMessagingController = class UserMessagingController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async handleCreateUser(data) {
        return await this.userService.registerUser(data);
    }
    async handleFindAllUsers() {
        return await this.userService.getAllUsers();
    }
    async handleFindUserById(data) {
        return await this.userService.getUserData(data.id);
    }
    async handleUpdateUser(data) {
        return await this.userService.updateUserData(data.id, data.dto, { userId: data.id, role: 'admin' });
    }
    async handleDeleteUser(data) {
        return await this.userService.deleteUser(data.id);
    }
    async handleFindUserByEmail(data) {
        return await this.userService.getUserByEmail(data.email);
    }
    async handleResetPassword(data) {
        return { message: 'Reset password functionality not implemented' };
    }
    async handleAuthVerify(data) {
        return await this.userService.verifyToken(data.token);
    }
};
exports.UserMessagingController = UserMessagingController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerUser_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], UserMessagingController.prototype, "handleCreateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_all_users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserMessagingController.prototype, "handleFindAllUsers", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_user_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMessagingController.prototype, "handleFindUserById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMessagingController.prototype, "handleUpdateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMessagingController.prototype, "handleDeleteUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_user_by_email' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMessagingController.prototype, "handleFindUserByEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'reset_password' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMessagingController.prototype, "handleResetPassword", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'auth.verify' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMessagingController.prototype, "handleAuthVerify", null);
exports.UserMessagingController = UserMessagingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserMessagingController);
//# sourceMappingURL=user.messaging.controller.js.map