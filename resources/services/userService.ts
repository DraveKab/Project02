import axios, { AxiosResponse } from "axios";

// อ่าน base url จาก env (ถ้าไม่มีใช้ dummyjson เป็นค่า default)
const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";

class UserService {
  async getUsers(): Promise<AxiosResponse> {
    return axios.get(`${BASE_URL}/users`);
  }

  async getUserById(id: number): Promise<AxiosResponse> {
    return axios.get(`${BASE_URL}/users/${id}`);
  }

  async createUser(payload: any): Promise<AxiosResponse> {
    return axios.post(`${BASE_URL}/users/add`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }

  async updateUser(id: number, payload: any): Promise<AxiosResponse> {
    return axios.put(`${BASE_URL}/users/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }

  async deleteUser(id: number): Promise<AxiosResponse> {
    return axios.delete(`${BASE_URL}/users/${id}`);
  }
}

// export instance
export default new UserService();
