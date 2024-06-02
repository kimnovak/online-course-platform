import { factory, primaryKey } from '@mswjs/data';
import { courses } from './data/courses';

export const db = factory({
  course: {
    id: primaryKey(Number),
    title: String,
    description: String,
    image: String,
    price: Number,
  },
});

courses.forEach(course => db.course.create(course));
