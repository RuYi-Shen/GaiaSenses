import { appClient } from "./lib/client";

const authService = {
  signUp: async (signUpData) => {
    const res = await appClient.post("/auth/signup", signUpData);
    return res.data;
  },
  signIn: async (signInData) => {
    const res = await appClient.post("/auth/signin", signInData);
    localStorage.setItem("userData", JSON.stringify(res.data));
    return res.data;
  },
  signOut: () => localStorage.clear(),
  localCredentials: () => {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  },
  setAuthorization: (token) => {
    appClient.defaults.headers.common['Authorization'] = token;
  }
}

export default authService;
