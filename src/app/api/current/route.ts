import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  console.log('### [GET] /api/current : ', session);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }

  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user!.email!,
      },
    });

    if (!currentUser) {
      return NextResponse.json(
        {
          error: 'User not found',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      {
        status: 500,
      },
    );
  }
}
