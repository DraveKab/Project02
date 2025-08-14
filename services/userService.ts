import axios from "axios";
import assert from "assert";

const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";

export class UserService {
  static async getAllUsers() {
    const response = await axios.get(`${BASE_URL}/users`);
    assert.strictEqual(response.status, 200);
    return response.data;
  }

  static async getUserById(id: number) {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    assert.strictEqual(response.status, 200);
    return response.data;
  }

  static async searchUsers(query: string) {
    const response = await axios.get(`${BASE_URL}/users/search?q=${query}`);
    assert.strictEqual(response.status, 200);
    return response.data;
  }

  static async createUser(payload: any) {
    const response = await axios.post(`${BASE_URL}/users/add`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    assert.strictEqual(response.status, 201);
    return response.data;
  }

  static async updateUser(id: number, payload: any) {
    const response = await axios.put(`${BASE_URL}/users/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    assert.strictEqual(response.status, 200);
    return response.data;
  }

  static async deleteUser(id: number) {
    const response = await axios.delete(`${BASE_URL}/users/${id}`);
    assert.strictEqual(response.status, 200);
    return response.data;
  }
}
