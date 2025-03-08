import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {User} from './user.entity'
import {UpdateUserDto} from "@entities/dto/updateUser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    availableFields = [
        'name',
        'email',
        'role',
        'created_at'
    ]

    // Filter body's fields from available fields list
    private filterFields(body: { [k: string]: any }) {
        const filteredBody: { [k: string]: any } = {}

        Object.keys(body).filter((k) => {
            if (this.availableFields.includes(k)) {
                filteredBody[k] = body[k]
            }
        });

        return filteredBody;
    }

    // Register new user
    public async createUser(userData: any) {
        const newUser = this.userRepository.create(userData)

        return await this.userRepository.save(newUser)
    }

    // Get all users
    public async getAllUsers() {
        return await this.userRepository.find({
            select: this.availableFields as any
        })
    }

    // Get user data by id
    public async getUserData(id: string) {
        return await this.userRepository.findOne({
            where: {id},
            select: this.availableFields as any
        })
    }

    // Update user data whole
    public async updateUserData(id: string, body: UpdateUserDto) {
        return await this.userRepository.update(
            {id},
            this.filterFields(body)
        )
    }

    // Delete user by id
    public async deleteUser(id: string) {
        return await this.userRepository.delete(id)
    }
}