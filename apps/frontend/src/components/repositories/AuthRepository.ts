import axiosInstance from "../../api/axios.ts";
import { Signup } from "../../types/auth.ts";


export const AuthRepository = {
  async signup(data: Signup) {
    const response = await axiosInstance.post("/signup", {
      username: data.username,
      email: data.email,
      password: data.password,
      repassword: data.repassword,
      country_id: data.country_id,
    });

    return response;
  },

  async signin(username: string, password: string) {
    const response = await axiosInstance.post("/signin", {
      username: username,
      password: password,
    });

    return response;
  },

  async signout() {
    const response = await axiosInstance.post("/signout");

    return response;
  },

  async profile() {
    const response = await axiosInstance.get("/profile");

    return response;
  },

  async refreshToken() {
    const response = await axiosInstance.post("/refresh");

    return response;
  }
};