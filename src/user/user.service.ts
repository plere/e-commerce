import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserUpdateInput } from './user.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }
    async createUser(data: User): Promise<Boolean> {
        let existUser = await this.userRepository.findOne({
            where: [
                {id: data.id},
                {phoneNumber: data.phoneNumber}
            ]
        });

        if(existUser) {
            return false;

        } else {
            let newUser = await this.userRepository.create(data);
            await this.userRepository.save(newUser);
            return true;
        }
    }
    async getUser() {
        return await this.userRepository.find();
    }

    async updateUser(id: string, data: UserUpdateInput): Promise<Boolean> {
        if(data.phoneNumber) {
            if(await this.userRepository.findOne({phoneNumber: data.phoneNumber})) {
                return false;                
            }
        }
        
        let user = await this.userRepository.findOne({id: id});
        for(let key in data) {
            user[key] = data[key];
        }

        await this.userRepository.save(user);
        return true;
    }

    async findOne(id: string) {
        return await this.userRepository.findOne(id);
    }
}
