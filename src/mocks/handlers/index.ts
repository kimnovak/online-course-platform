import { db } from '../db';

const BASE_URL = 'http://localhost:5173';

export const handlers = [...db.course.toHandlers('rest', `${BASE_URL}/api`)];
