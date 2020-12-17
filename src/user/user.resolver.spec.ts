import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/auth/auth.module';
import { UserInput } from './user.input';
import { UserModule } from './user.module';
import { UserResolver } from './user.resolver';

let resolver: UserResolver;
let user: UserInput = {
  id: "testId_01",
  password: "test",
  address: "seoul",
  phoneNumber: 12345
};   

beforeEach(async () => {
  await resolver.createUser(user);
})

afterEach(async () => {
  await resolver.userRemove(user.id, user.password);
});

describe('UserResolver', () => {
  beforeAll(async () => {    
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        forwardRef(() => AuthModule),
        UserModule
      ],
      providers: [UserResolver],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);      
  });    

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });  
});

describe('get User', () => {
  it('return array', async () => {
    let result = await resolver.getUsers();
    expect(result).toBeInstanceOf(Array);
  })
})

describe('create user and remove user', () => {
  let newUser: UserInput = {
    id: "testId_02",
    password: "test",
    address: "busan",
    phoneNumber: 123444
  }

  it('create/remove user return true', async () => {
    let result = await resolver.createUser(newUser);
    expect(result).toEqual(true);

    result = await resolver.userRemove(newUser.id, newUser.password);
    expect(result).toEqual(true);
  });

  it('create user throw err', async () => {
    try {
      await resolver.createUser(user);
    } catch(e) {
      expect(e.message).toEqual('check id or phoneNumber');
    }
  });
})

describe('update user', () => {
  it('update user', async () => {    
    await resolver.updateUser(user.id, {
      address: "Incheon"
    });
  
    let result = await resolver.getUser(user.id);
    expect(result.address).toEqual('Incheon');
  });

  it('throw err', async () => {
    let newUser: UserInput = {
      id: "testId_03",
      password: "test",
      address: "busan",
      phoneNumber: 123444
    }

    let result = await resolver.createUser(newUser);
    expect(result).toEqual(true);

    try {
      await resolver.updateUser(user.id, {
        phoneNumber:123444 
      });
    } catch(e) {
      expect(e.message).toEqual('check phoneNumber');
    }

    result = await resolver.userRemove(newUser.id, newUser.password);
    expect(result).toEqual(true);
  });
});