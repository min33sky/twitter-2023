import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prismaDB';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { JWT, decode } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  // const session: any = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  // console.log('### [GET] /api/current - session : ', session);

  const nextCookies = cookies();

  // key/value 배열 형태로 되어 있으므로 reduce를 사용해서 문자열로 만든다.
  const cookie = nextCookies.getAll().reduce((acc, cur) => {
    // return `${acc}${cur.name}=${cur.value}; `;
    if (cur.name === 'next-auth.session-token') {
      return acc + cur.value;
    }

    return acc;
  }, '');

  console.log('### [GET] /api/current  - cookies : ', cookie);

  const session: JWT | null = await decode({
    token: cookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  console.log('### [GET] /api/current  - decoded 토큰 : ', session);
  // console.log('### [GET] /api/current  - authOptions : ', authOptions);

  // const session = await getServerSession(authOptions);

  // console.log('### [GET] /api/current - session : ', session);

  // console.log('### [GET] /api/current - session : ', session);

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
        // email: session.user!.email!,
        email: session.email!,
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
    console.log('### [GET] /api/current - error : ', error);

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
