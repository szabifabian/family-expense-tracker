import { app } from "../src/server";
import supertest from "supertest";

describe("Family Expense Tracker App", () => {
  const user = {
    username: "csongor",
    email: "csongor@gmail.com",
    password: "password12345678",
  };
  const user2 = {
    username: "felhasználó 1",
    email: "felhasznalo1@gmail.com",
    password: "felhasznalo1",
  };

  let requestHandle: supertest.SuperTest<supertest.Test>;

  let token: string;
  let user2Token: string;
  const family = { family_name: 'First name'};
  const family2 = { family_name: 'Second name'};

  beforeEach(() => {
    requestHandle = supertest(app);
  });

  describe("Authentication", () => {
    it("should register", async () => {
      await requestHandle.post("/user/register").send(user).expect(200);
    });

    it("should fail on same user registration", async () => {
      await requestHandle.post("/user/register").send(user).expect(409);
    });

    it("should login with registered user", async () => {
      await requestHandle.post("/user/login").send(user).expect(200);
    });
  });

  beforeEach(async () => {
    const loginResponse = await requestHandle.post("/user/login").send(user);
    const user2LoginResponse = await requestHandle
      .post("/user/login")
      .send(user2);
    token = `Bearer ${loginResponse.body.token}`;
    user2Token = `Bearer ${user2LoginResponse.body.token}`;
  });

  describe("Create family", () => {
    it("should create a new family", async () => {
      await requestHandle
        .post("/familymember/create")
        .send(family)
        .set("Authorization", token)
        .expect(200);
    });

    it("shouldn't create a new family for second time ", async () => {
      await requestHandle
        .post("/familymember/create")
        .send(family2)
        .set("Authorization", token)
        .expect(409);
    });

    it("shouldn't create a new family without a token", async () => {
      await requestHandle.post("/familymember/create").expect(401);
    });
  });

  describe("Invite to a family", () => {
    const invitation = {
      invited_user: "1",
    };

    it("should send an invitation to an existing user without a family", async () => {
      await requestHandle
        .post("/invitation/send")
        .set("Authorization", token)
        .send(invitation)
        .expect(200);
    });

    it("should accept invitation the invited user", async () => {
      await requestHandle
        .put("/invitation/accept/4")
        .set("Authorization", user2Token)
        .expect(200);
    });

    it("shouldn't accept invitation the invited user for second time", async () => {
      await requestHandle
        .put("/invitation/accept/4")
        .set("Authorization", user2Token)
        .expect(403);
    });

    it("shouldn't accept non-existing invitation", async () => {
      await requestHandle
        .put("/invitation/accept/5")
        .set("Authorization", user2Token)
        .expect(403);
    });

    it("shouldn't accept invitation without a token", async () => {
      await requestHandle.put("/invitation/accept/5").expect(401);
    });
  });

  describe("Get family members list", () => {

    it("should get your family members", async () => {
      await requestHandle
        .get("/familymember/members")
        .set("Authorization", token)
        .expect(200);
    });
  });

  describe("Delete a family member", () => {
    it("shouldn't delete if user is not admin", async () => {
      await requestHandle
        .delete("/familymember/delete/1")
        .set("Authorization", user2Token)
        .expect(403);
    });

    it("shouldn't delete if user not in family", async () => {
      await requestHandle
        .delete("/familymember/delete/2")
        .set("Authorization", user2Token)
        .expect(403);
    });

    it("should delete if you are the admin", async () => {
      await requestHandle
        .delete("/familymember/delete/1")
        .set("Authorization", token)
        .expect(200);
    });
  });

  describe("Balance", () => {
    const data = {
      title: "teszt1",
      type: "EXPENSE",
      amount: "100",
      about: "kiadás",
    };

    const data2 = {
      title: "new expense"
    }

    it("should add a new expense", async () => {
      await requestHandle
        .post("/balance/add")
        .set("Authorization", token)
        .send(data)
        .expect(200);
    });

    it("should add a new expense", async () => {
      await requestHandle
        .post("/balance/add")
        .set("Authorization", token)
        .send(data)
        .expect(200);
    });

    it("shouldn't delete a non existing expense", async () => {
      await requestHandle
        .delete("/balance/delete/8")
        .set("Authorization", token)
        .expect(404);
    });

    it("should delete an existing expense", async () => {
      await requestHandle
        .delete("/balance/delete/1")
        .set("Authorization", token)
        .expect(200);
    });

    it("should get the expense from your family", async () => {
      await requestHandle
        .get("/balance/1")
        .set("Authorization", token)
        .expect(200);
    });

    it("shouldn't get a non existing expense", async () => {
      await requestHandle
        .get("/balance/3")
        .set("Authorization", token)
        .expect(403);
    });

    it("should edit the expense from your family", async () => {
      await requestHandle
        .put("/balance/edit/1")
        .set("Authorization", token)
        .send(data2)
        .expect(200);
    });

    it("shouldn't edit a non-existing expense", async () => {
      await requestHandle
        .put("/balance/edit/5")
        .set("Authorization", token)
        .send(data2)
        .expect(403);
    });

  });
});
