import request from "supertest";

import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("Sessions controller", () => {
  let user_id: string;

  it("should authenticate and get and access token", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "test user",
      email: "auth_test@user.com",
      password: "123456",
    });
    user_id = userResponse.body.id;

    const SessionResponse = await request(app).post("/sessions").send({
      email: "auth_test@user.com",
      password: "123456",
    });

    expect(SessionResponse.status).toBe(200);
    expect(SessionResponse.body.token).toEqual(expect.any(String));
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        id: user_id,
      },
    });
  });
});
