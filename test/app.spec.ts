import { app } from '../src/server';
import supertest from 'supertest';

describe('Family Expense Tracker App', () => {
  const user = { username: 'csongor', email: 'csongor@gmail.com', password: 'password' };

  let requestHandle: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    requestHandle = supertest(app);
  });

  describe('authentication', () => {
    it('should register', async () => {
      await requestHandle.post('/user/register').send(user).expect(200);
    });

    it('should fail on same user registration', async () => {
      await requestHandle.post('/user/register').send(user).expect(409);
    });

    it('should login with registered user', async () => {
      await requestHandle.post('/user/login').send(user).expect(200);
    });
  });  
});