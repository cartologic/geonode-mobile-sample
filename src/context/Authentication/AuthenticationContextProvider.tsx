import React, { useState, useEffect, useCallback } from "react";
import qs from "querystring";
import { Plugins } from "@capacitor/core";

import axios from "../../utils/axios";
import AuthenticationContext, { SystemUser } from "./AuthenticationContext";
import appConfig from "../../config";

const { Storage } = Plugins;
const AuthenticationContextProvider: React.FC = (props) => {
  const [currentUser, setCurrentUser] = useState<SystemUser | null>(null);

  // Save to disk whenever there is a change
  useEffect(() => {
    Storage.set({
      key: "authentication",
      value: JSON.stringify(currentUser),
    });
  }, [currentUser]);

  // Called at application startup, loads the saved data
  const initializeAuthenticationContext = useCallback(async () => {
    const authenticationData = await Storage.get({ key: "authentication" });
    const storedAuthentication = authenticationData.value
      ? JSON.parse(authenticationData.value)
      : null;
    setCurrentUser(storedAuthentication);
  }, []);

  const loginHandler = async (username: string, password: string) => {
    // Prepare authentication request
    const authenticationRequestBody = {
      client_id: appConfig.authenticationClientId,
      client_secret: appConfig.authenticationClientSecret,
      grant_type: appConfig.authenticationType,
      username: username,
      password: password,
    };
    try {
      // Authenticate from GeoNode backend
      const authenticationResponse = await axios.post(
        appConfig.authenticationURL,
        qs.stringify(authenticationRequestBody),
        {headers: { "Content-Type": "application/x-www-form-urlencoded" }}
      );
      // Load profile details from GeoNode profile API endpoint
      const profileResponse = await axios.get(appConfig.profileURL, {
        params: { username },
      });
      const requestedProfile = profileResponse.data.objects[0];
      const tempUser: SystemUser = {
        username,
        firstName: requestedProfile.first_name,
        lastName: requestedProfile.last_name,
        id: requestedProfile.id,
        avatar: requestedProfile.avatar_100,
        dateJoined: new Date(requestedProfile.date_joined),
        accessToken: authenticationResponse.data.access_token,
        refreshToken: authenticationResponse.data.refresh_token,
        expires: null,
      };
      // Set User data in the context
      setCurrentUser(tempUser);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logoutHandler = async () => {
    const logoutRequestBody = {
      client_id: appConfig.authenticationClientId,
      client_secret: appConfig.authenticationClientSecret,
      token: currentUser?.accessToken,
    };
    try {
      await axios.post(
        appConfig.logoutURL,
        qs.stringify(logoutRequestBody),
        {headers: { "Content-Type": "application/x-www-form-urlencoded" }}
      );
      setCurrentUser(null);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        currentUser,
        loginHandler,
        logoutHandler,
        initializeAuthenticationContext,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
