import { factory, manyOf, primaryKey } from '@mswjs/data';
import { courses } from './data/courses';
import { nanoid } from 'nanoid';
import { hashPassword } from './handlers/auth';

export const db = factory({
  user: {
    id: primaryKey(String),
    username: String,
    password: String,
    courses: manyOf('course'),
  },
  course: {
    id: primaryKey(Number),
    title: String,
    description: String,
    image: String,
    price: Number,
  },
});

const seed = async () => {
  const password = await hashPassword('admin');
  courses.forEach(course => db.course.create(course));
  const course = db.course.findFirst({ where: { id: { equals: 1 } } });
  db.user.create({
    id: nanoid(),
    username: 'admin',
    password,
    courses: course ? [course] : [],
  });
};

seed();
