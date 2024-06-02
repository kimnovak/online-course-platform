import { db } from '../db';
import { authHandlers } from './auth';

const BASE_URL = 'http://localhost:5173';

export const handlers = [
  ...db.course.toHandlers('rest', `${BASE_URL}/api`),
  ...authHandlers,
];
