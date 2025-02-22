import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyProfileQuery } from 'store/reducers/api';
import { useLoginMutation, useRegisterMutation } from 'store/reducers/auth';
import { useGetMeQuery } from 'store/reducers/users';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState('loading');
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [login] = useLoginMutation();
  const {
    data: userData,
    refetch,
    isFetching,
    isLoading,
  } = useGetMeQuery(null, {
    skip: (isAuthenticated !== 'loading' && isAuthenticated) || !localStorage.getItem('authToken'),
  });
  const { data: profileData, isSuccess } = useMyProfileQuery(null, {
    skip:
      !isAuthenticated || !localStorage.getItem('authToken') || userData?.user_id !== user?.user_id,
  });
  const [register] = useRegisterMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [userData, navigate, isAuthenticated]);

  useEffect(() => {
    if (isSuccess) {
      setProfile(() => profileData);
    }
  }, [isSuccess, profileData]);

  const handleLogin = useCallback(
    async (credentials) => {
      try {
        const { access_token } = await login(credentials).unwrap();
        localStorage.setItem('authToken', access_token);
        window.location.replace('/');
        return null;
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        return error;
      }
    },
    [login]
  );

  const handleLogout = useCallback(async () => {
    try {
      localStorage.clear();
      window.location.replace('/login');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, []);

  const refreshAuthState = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleRegister = useCallback(
    async (credentials) => {
      try {
        const { data } = await register(credentials).unwrap();
        return data;
      } catch (error) {
        return error;
      }
    },
    [register]
  );

  const value = useMemo(
    () => ({
      isAuth: isAuthenticated,
      user,
      profile,
      login: handleLogin,
      logout: handleLogout,
      register: handleRegister,
      refreshAuthState,
    }),
    [isAuthenticated, user, handleLogin, handleLogout, handleRegister, refreshAuthState, profile]
  );

  if (isFetching || isLoading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
