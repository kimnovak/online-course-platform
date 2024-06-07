import { useAuth } from '../Auth/AuthProvider/AuthProvider';

export const useEnrollments = () => {
  const { currentUser } = useAuth();
  const purchasedCourses = currentUser?.courses ?? [];
  const isCoursePurchased = (courseId: number) => {
    return purchasedCourses.find(({ id }) => courseId === id);
  };
  return { purchasedCourses, isCoursePurchased };
};
