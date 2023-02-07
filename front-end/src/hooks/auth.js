import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import authService from "../services/auth";

export default function useAuth() {
  const { userData, setUserData } = useContext(UserContext);

  const authActions = {
    signUp: (userInfo) => authService.signUp(userInfo),
    signIn: async (userInfo) => {
      const user = await authService.signIn(userInfo);
      authService.setAuthorization(user.token);
      setUserData(user);
      return user;
    },
    signOut: () => {
      authService.signOut();
      authService.setAuthorization(null);
      setUserData({});
    },
    restore: () => {
      const user = authService.localCredentials();
      authService.setAuthorization(user.token);
      setUserData(user);
    },
    hasLocalCredentials: () => {
      return authService.localCredentials() !== null;
    }
  }
  return { userData, authActions };
}
