import { test, expect } from "@playwright/test";
import userService from "../resources/services/userService";

test.describe("User API Tests", () => {
  test("GET all users", async () => {
    const response = await userService.getUsers();
    expect(response.status).toBe(200);

    const firstUser = response.data.users[0];
    userService.validateUserProperties(firstUser); // ✅ ใช้ helper function
  });

  test("GET user by ID", async () => {
    const response = await userService.getUserById(1);
    expect(response.status).toBe(200);

    userService.validateUserProperties(response.data); // ✅ ใช้ helper function
  });

  test("POST create new user", async () => {
    const payload = {
      firstName: "John",
      lastName: "Doe",
    };
    const response = await userService.createUser(payload);
    expect(response.status).toBe(200);

    userService.validateUserProperties(response.data); // ✅
  });

  test("PUT update user", async () => {
    const payload = {
      firstName: "Jane",
    };
    const response = await userService.updateUser(1, payload);
    expect(response.status).toBe(200);

    expect(response.data.firstName).toBe("Jane");
  });

  test("DELETE user", async () => {
    const response = await userService.deleteUser(1);
    expect(response.status).toBe(200);

    expect(response.data.isDeleted || response.data).toBeTruthy();
  });
});
