import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '@src/entities/store.entity';
import { StoreService } from './store.service';

let service: StoreService;
let store: Store = {
  store_name: 'testId_store_service_01',
  password: 'test'
};

beforeEach(async () => {
  await service.createStore(store);
});

afterEach(async () => {
  await service.remove(store.store_name, store.password);
});

describe('StoreService', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({      
      imports: [
        TypeOrmModule.forRoot(), 
        TypeOrmModule.forFeature([Store])
      ],
      providers: [StoreService]
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('get store', () => {
  it('return array', async () => {
    let result = await service.getStore();
    expect(result).toBeInstanceOf(Array);
  });
});

describe('create/remove store', () => {  
  it('return true', async () => {
    let newStore: Store = {
      store_name: 'testId_store_service_02',
      password: 'test'
    };

    let result = await service.createStore(newStore);
    expect(result).toEqual(true);

    result = await service.remove(newStore.store_name, newStore.password);
    expect(result).toEqual(true);
  });

  it('return false', async () => {
    let result = await service.createStore(store);
    expect(result).toEqual(false);
  });
})

describe('update store', () => {
  it('return true', async () => {
    let result = await service.updateStore(store.store_name, {
      password: 'test2'
    });
    expect(result).toEqual(true);
  });
});

describe('find one store', () => {
  it('return one store', async () => {
    let result = await service.findOne(store.store_name);
    expect(result).toBeInstanceOf(Store);
  });

  it('return null', async () => {
    let result = await service.findOne('testId_store_service_999');
    expect(result).toEqual(null);
  });
})

