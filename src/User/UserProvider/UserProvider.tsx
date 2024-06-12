import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { Course } from '../../Courses/types';
import { useAuth } from '../../Auth/AuthProvider/AuthProvider';
import * as userApi from '../../api/users';

type User = {
  id: string;
  username: string;
  courses: Course[];
};

interface UserContextType {
  currentUser?: User;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    getCurrentUser();
  }, [isAuthenticated]);

  const getCurrentUser = async () => {
    try {
      const response = await userApi.getCurrentUser();
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setCurrentUser(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
