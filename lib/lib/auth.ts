import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function validateLogin(data: unknown) {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) return { error: 'Invalid email or password' };

  const { email, password } = parsed.data;
  const hashed = process.env.ADMIN_PASSWORD_HASH;

  if (!hashed || !(await bcrypt.compare(password, hashed))) {
    return { error: 'Invalid credentials' };
  }

  // Create secure token
  const token = crypto.randomUUID();
  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return { success: true, token };
}
