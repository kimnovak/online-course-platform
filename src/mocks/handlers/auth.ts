import { HttpResponse, http } from 'msw';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { db } from '../db';

const SALT_ROUNDS = 10;

const createJwtToken = (userId: string): string => {
  return `mock-token-for-user-${userId}`;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const mockVerifyToken = (token: string): { userId: string } | null => {
  const match = token.startsWith('mock-token-for-user');
  const split = token.split('-');
  if (match) {
    return { userId: split[split.length - 1] };
  }
  return null;
};

export const authHandlers = [
  // Registration handler
  http.post('/api/register', async ({ request }) => {
    const { username, password } = await request.json();
    if (!username || !password) {
      return new HttpResponse('Username and password are required.', {
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    const existingUser = db.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });
    if (existingUser) {
      return new HttpResponse('Username already exists..', {
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = { id: nanoid(), username, password: hashedPassword };
    db.user.create(newUser);
    return new HttpResponse(
      JSON.stringify({ id: newUser.id, username: newUser.username }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }),

  // Login handler
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new HttpResponse('Username and password are required.', {
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    const user = db.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });
    console.log({ user });
    if (!user) {
      return new HttpResponse('Invalid username or password.', {
        status: 401,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log({ passwordMatch });
    if (!passwordMatch) {
      return new HttpResponse('Invalid username or password.', {
        status: 401,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    const token = createJwtToken(user.id);

    return new HttpResponse(JSON.stringify({ token }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  // Handler for a protected endpoint
  http.get('/api/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return new HttpResponse(
        JSON.stringify({ message: 'Authorization header missing' }),
        {
          status: 401,
        }
      );
    }

    const token = authHeader.split(' ')[1];
    const payload = mockVerifyToken(token);
    console.log({ payload, token });
    if (!payload) {
      return new HttpResponse(JSON.stringify({ message: 'Invalid token' }), {
        status: 401,
      });
    }

    const user = db.user.findFirst({
      where: { id: { equals: payload.userId } },
    });
    if (!user) {
      return new HttpResponse(JSON.stringify({ message: 'Invalid token' }), {
        status: 401,
      });
    }
    const { password, ...userData } = user ?? {};
    return new HttpResponse(JSON.stringify({ user: userData }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
