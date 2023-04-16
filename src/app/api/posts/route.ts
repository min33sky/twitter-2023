import { prisma } from '@/lib/prismaDB';
import { Post } from '@prisma/client';
import { JWT, decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get('userId');

  console.log('### [GET] /api/posts  - userId : ', userId);

  let posts: Post[];

  try {
    if (userId) {
      posts = await prisma.post.findMany({
        where: {
          id: userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    return NextResponse.json(posts);
  } catch (error) {
    console.log('### [GET] /api/posts - error : ', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  // TODO: decodeJWT 함수로 대체하기

  const nextCookies = cookies();

  const cookie = nextCookies.getAll().find((cur) => {
    return cur.name === 'next-auth.session-token';
  })?.value;

  console.log('### [POST] /api/posts  - cookie : ', cookie);

  if (!cookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const session: JWT | null = await decode({
    token: cookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log('### [POST] /api/posts  - decoded 토큰 : ', session);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
}
