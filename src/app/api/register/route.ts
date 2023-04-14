import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, username, name, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Internal server error',
      },
    };
  }
}
