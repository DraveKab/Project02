import { test, expect } from "@playwright/test";
import userService from "../resources/services/userService";
import userData from "../resources/data/userData.json";

test.describe("User API Tests", () => {

  test("GET all users", async () => {
    const response = await userService.getUsers();

    // assert status code
    expect(response.status).toBe(200);

    // validate json structure
    expect(response.data).toHaveProperty("users");
    expect(Array.isArray(response.data.users)).toBeTruthy();
    expect(response.data.total).toBeGreaterThan(0);

    // check first user fields
    const firstUser = response.data.users[0];
    expect(firstUser).toHaveProperty("id");
    expect(firstUser).toHaveProperty("firstName");
    expect(firstUser).toHaveProperty("lastName");
  });

  test("POST create user", async () => {
    const payload = userData.createUser;
    const response = await userService.createUser(payload);

    expect([200, 201]).toContain(response.status); // รองรับทั้ง 200 และ 201
    expect(response.data.firstName).toBe(payload.firstName);
    expect(response.data.lastName).toBe(payload.lastName);
    expect(response.data.age).toBe(payload.age);
    expect(response.data).toHaveProperty("id"); // id ใหม่ต้องถูกสร้าง
  });

  test("PUT update user", async () => {
  const userId = 1; // ใช้ id ที่มีจริง
  const payload = userData.updateUser;

  const response = await userService.updateUser(userId, payload);

  expect([200, 201]).toContain(response.status);
  expect(response.data.lastName).toBe(payload.lastName);
  expect(response.data.id).toBe(userId);
});

test("DELETE user", async () => {
  const userId = 1; // ใช้ id ที่มีจริง

  const response = await userService.deleteUser(userId);

  expect([200, 201]).toContain(response.status);
  expect(response.data.isDeleted).toBeTruthy();
  expect(response.data.id).toBe(userId);
});

});
