import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  // console.log('### [users/[userId]] GET request: ', userId);

  if (!userId) {
    return NextResponse.json(
      { error: '[users/[userId]] Missing userId' },
      {
        status: 400,
      },
    );
  }

  try {
    const [user, followersCount] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: userId,
        },
      }),
      prisma.user.count({
        where: {
          followingIds: {
            has: userId,
          },
        },
      }),
    ]);

    // console.log('### [users/[userId]] GET user: ', user);
    // console.log('### [users/[userId]] GET followersCount: ', followersCount);

    if (!user) {
      return NextResponse.json(
        { error: '[users/[userId]] User not found' },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      ...user,
      followersCount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: '[users/[userId]] Server Error' },
      {
        status: 500,
      },
    );
  }
}
