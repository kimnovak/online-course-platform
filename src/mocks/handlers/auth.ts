import { http } from 'msw';
import bcrypt from 'bcryptjs';
import { db } from '../db';

const SALT_ROUNDS = 10;

export const authHandlers = [
  // Registration handler
  http.post('/api/register', async (req, res, ctx) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Username and password are required.' })
      );
    }

    const existingUser = db.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });
    if (existingUser) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Username already exists.' })
      );
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { id: Date.now(), username, password: hashedPassword };
    db.user.create(newUser);

    return res(
      ctx.status(201),
      ctx.json({ message: 'User registered successfully.' })
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
