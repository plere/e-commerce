import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

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
}
