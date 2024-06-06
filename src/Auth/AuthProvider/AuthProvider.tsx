import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import * as authApi from '../../api/auth';
import { Course } from '../../Courses/types';

type User = {
  id: string;
  username: string;
  courses: Course[];
};

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser?: User;
  login: (loginData: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    getCurrentUser();
  }, [isAuthenticated]);

  const getCurrentUser = async () => {
    try {
      const response = await authApi.getCurrentUser();
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setCurrentUser(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (loginData: { username: string; password: string }) => {
    try {
      const response = await authApi.login(loginData);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      localStorage.setItem('authToken', data.token);
      setIsAuthenticated(true);
    } catch (err: any) {
      setIsAuthenticated(false);
      throw new Error(err.message || 'Something went wrong');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
