import React from "react";

export interface SystemUser {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  id: string | null;
  avatar: string | undefined;
  dateJoined: Date | null;
  accessToken: string | null;
  refreshToken: string | null;
  expires: Date | null;
}

interface Context {
  currentUser: SystemUser | null;
  loginHandler: (username: string, password: string) => Promise<Boolean>;
  logoutHandler: () => Promise<Boolean>;
  initializeAuthenticationContext: () => void;
}

const AuthenticationContext = React.createContext<Context>({
  currentUser: null,
  loginHandler: async (username, password) => false,
  logoutHandler: async () => false,
  initializeAuthenticationContext: () => {},
});

export default AuthenticationContext;
