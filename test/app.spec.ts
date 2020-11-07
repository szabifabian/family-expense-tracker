import { app } from '../src/server';
import supertest from 'supertest';

describe('Family Expense Tracker App', () => {
  const user = { username: 'csongor', email: 'csongor@gmail.com', password: 'password12345678' };
  const user2 = { username: 'felhasználó 1', email: 'felhasznalo1@gmail.com', password: 'felhasznalo1' };

  let requestHandle: supertest.SuperTest<supertest.Test>;

  let token: string;
  let user2Token: string;

  beforeEach(() => {
    requestHandle = supertest(app);
  });


  describe('Authentication', () => {
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

  beforeEach(async () => {
    const loginResponse = await requestHandle.post('/user/login').send(user);
    const user2LoginResponse = await requestHandle.post('/user/login').send(user2);
    token = `Bearer ${loginResponse.text}`;
    user2Token = `Bearer ${user2LoginResponse.text}`;
  });

  describe('Create family', () => {

    it('should create a new family', async () => {
      await requestHandle.post('/familymember/create').set('Authorization', token).expect(201);
    });

    it('shouldn\'t create a new family for second time ', async () => {
      await requestHandle.post('/familymember/create').set('Authorization', token).expect(409);
    });

    it('shouldn\'t create a new family without a token', async () => {
      await requestHandle.post('/familymember/create').expect(401);
    });
  }); 

  describe('Invite to a family', () => {

    const invitation = {
      "invited_user": "1"
    }

    it('should send an invitation to an existing user without a family', async () => {
      await requestHandle.post('/invitation/send').set('Authorization', token).send(invitation).expect(200);
    });

    it('should accept invitation the invited user', async () => {
      await requestHandle.put('/invitation/accept/4').set('Authorization', user2Token).expect(200);
    });

    it('shouldn\'t accept invitation the invited user for second time', async () => {
      await requestHandle.put('/invitation/accept/4').set('Authorization', user2Token).expect(403);
    });

    it('shouldn\'t accept non-existing invitation', async () => {
      await requestHandle.put('/invitation/accept/5').set('Authorization', user2Token).expect(403);
    });

    it('shouldn\'t accept invitation without a token', async () => {
      await requestHandle.put('/invitation/accept/5').expect(401);
    });
  }); 
});