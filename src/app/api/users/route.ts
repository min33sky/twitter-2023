import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: '[users] Server Error' },
      {
        status: 500,
      },
    );
  }
}
