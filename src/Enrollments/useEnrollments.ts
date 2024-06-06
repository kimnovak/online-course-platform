import { useAuth } from '../Auth/AuthProvider/AuthProvider';

export const useEnrollments = () => {
  const { currentUser } = useAuth();
  return { purchasedCourses: currentUser?.courses ?? [] };
};
