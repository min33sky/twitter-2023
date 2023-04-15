import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaDB';
import { JWT, decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function PATCH(request: Request) {
  const nextCookies = cookies();

  // const cookie = nextCookies.getAll().reduce((acc, cur) => {
  //   if (cur.name === 'next-auth.session-token') {
  //     return acc + cur.value;
  //   }
  //   return acc;
  // }, '');

  const cookie = nextCookies.getAll().find((cur) => {
    return cur.name === 'next-auth.session-token';
  })?.value;

  console.log('### [PATCH] /api/edit  - cookie : ', cookie);

  if (!cookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const session: JWT | null = await decode({
    token: cookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log('### [PATCH] /api/edit  - decoded 토큰 : ', session);

  // const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: session.email!,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { name, username, bio, profileImage, coverImage } =
      await request.json();

    const updatedUser = await prisma.user.update({
      where: {
        email: session.email!,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
