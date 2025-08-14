import { test } from "@playwright/test";
import { UserService } from "../services/userService";
import assert from "assert";

test.describe("User API Tests", () => {

  test("GET all users", async () => {
    const data = await UserService.getAllUsers();
    assert.ok(data.users.length > 0, "Users list should not be empty");
  });

  test("GET user by ID", async () => {
    const data = await UserService.getUserById(1);
    assert.strictEqual(data.id, 1);
  });

  test("SEARCH user", async () => {
    const data = await UserService.searchUsers("Emily");
    assert.ok(data.users.some((u: any) => u.firstName === "Emily"));
  });

  test("POST create new user", async () => {
    const payload = {
      firstName: "John",
      lastName: "Doe",
      age: 30
    };
    const data = await UserService.createUser(payload);
    assert.strictEqual(data.firstName, "John");
    assert.strictEqual(data.lastName, "Doe");
  });

  test("PUT update user", async () => {
    const payload = { lastName: "Updated" };
    const data = await UserService.updateUser(1, payload);
    assert.strictEqual(data.lastName, "Updated");
  });

  test("DELETE user", async () => {
    const data = await UserService.deleteUser(1);
    assert.strictEqual(data.isDeleted, true);
  });

});
