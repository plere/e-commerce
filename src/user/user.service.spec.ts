import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/entities/user.entity';
import { UserService } from './user.service';

let service: UserService;
let user: User = {
  id: "testId_user_service_01",
  password: "test",
  address: "seoul",
  phoneNumber: 5678
};

beforeEach(async () => {
  await service.createUser(user);
})

afterEach(async () => {
  await service.remove(user.id, user.password);
});

describe('UserService', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(), 
        TypeOrmModule.forFeature([User])
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('create user', () => {  
  let newUser: User = {
    id: "testId_user_service_02",
    password: "test",
    address: "seoul",
    phoneNumber: 1234
  };

  it('return true', async () => {
    let result = await service.createUser(newUser);
    expect(result).toEqual(true);
  });

  it('return false(exist user)', async () => {
    let result = await service.createUser(user);
    expect(result).toEqual(false);
  });
});

describe('get users', () => {
  it('return user array', async () => {
    let result = await service.getUsers();
    expect(result).toBeInstanceOf(Array);
  })
})

describe('update user and remove user', () => {
  it('return true', async () => {
    let result = await service.updateUser(user.id, {
      address: 'busan'
    });
    expect(result).toEqual(true);
  });

  it('return false(exist phoneNumber) and remove user', async () => {
    let newUser: User = {
      id: "testId_user_service_03",
      password: "test",
      address: "busan",
      phoneNumber: 123444
    }

    let result = await service.createUser(newUser);
    expect(result).toEqual(true);

    result = await service.updateUser(user.id, {
      phoneNumber: 123444
    });

    expect(result).toEqual(false);

    result = await service.remove(newUser.id, newUser.password);
    expect(result).toEqual(true);
  });

  it('remove user return false', async () => {    
    let result = await service.remove('testId_user_service_999', 'test');
    expect(result).toEqual(false);
  })
  
});

describe('find one user', () => {
  it('return user', async () => {
    let result = await service.findOne(user.id);
    expect(result).toBeInstanceOf(User);
  })
})

