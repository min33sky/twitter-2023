import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const nextCookies = cookies();

  // key/value 배열 형태로 되어 있으므로 reduce를 사용해서 문자열로 만든다.
  const cookie = nextCookies.getAll().reduce((acc, cur) => {
    return `${acc}${cur.name}=${cur.value}; `;
  }, '');

  console.log('### [GET] /api/current  - cookies : ', cookie);
  console.log('### [GET] /api/current  - authOptions : ', authOptions);

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
