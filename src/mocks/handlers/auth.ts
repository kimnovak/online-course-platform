import { HttpResponse, http } from 'msw';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { db } from '../db';

const SALT_ROUNDS = 10;

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

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

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
  http.post('/api/login', async (req, res, ctx) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Username and password are required.' })
      );
    }

    const user = db.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });
    if (!user) {
      return res(
        ctx.status(401),
        ctx.json({ error: 'Invalid username or password.' })
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res(
        ctx.status(401),
        ctx.json({ error: 'Invalid username or password.' })
      );
    }

    // Generate a session token (for demonstration, we'll use a simple token)
    const token = `fake-jwt-token-${Date.now()}`;

    return res(
      ctx.status(200),
      ctx.json({ message: 'Login successful.', token })
    );
  }),
];
