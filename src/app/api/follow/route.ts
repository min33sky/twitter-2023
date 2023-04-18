import decodeJWT from '@/lib/decodeJWT';
import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  //
  const session = await decodeJWT();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: session.sub,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { userId } = await request.json();

    const updatedFollowingIds = [...existingUser.followingIds, userId];

    const updatedUser = await prisma.user.update({
      where: {
        id: session.sub,
      },
      data: {
        followingIds: {
          set: updatedFollowingIds,
        },
      },
    });

    // NOTIFICATION PART START
    try {
      await prisma.notification.create({
        data: {
          body: 'Someone followed you!',
          userId,
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
    // NOTIFICATION PART END

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('### [POST] /api/follow - error : ', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const userId = new URL(request.url).searchParams.get('userId');

  const session = await decodeJWT();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: session.sub,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedFollowingIds = existingUser.followingIds.filter(
      (id) => id !== userId,
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: session.sub,
      },
      data: {
        followingIds: {
          set: updatedFollowingIds,
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('### [DELETE] /api/follow - error : ', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
