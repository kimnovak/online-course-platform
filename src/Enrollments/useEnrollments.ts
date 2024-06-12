import { useUser } from '../User/UserProvider/UserProvider';

export const useEnrollments = () => {
  const { currentUser } = useUser();
  const purchasedCourses = currentUser?.courses ?? [];
  const isCoursePurchased = (courseId: number) => {
    return purchasedCourses.find(({ id }) => courseId === id);
  };
  return { purchasedCourses, isCoursePurchased };
};
