import decodeJWT from '@/lib/decodeJWT';
import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // 인증 여부 확인
  const session = await decodeJWT();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // 좋아요 기능 구현
  try {
    const { postId } = await request.json();

    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // 포스트가 있는지 확인

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const updatedLikedIds = [...existingPost.likeIds, session.sub!];

    // TODO: Notification

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeIds: {
          set: updatedLikedIds,
        },
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log('### [POST] /api/like - error : ', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  // 인증 여부 확인
  // 좋아요 취소 구현
  const session = await decodeJWT();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const postId = new URL(request.url).searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post id is required' },
        { status: 400 },
      );
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // 포스트가 있는지 확인

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const updatedLikedIds = existingPost.likeIds.filter(
      (id) => id !== session.sub,
    );

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeIds: {
          set: updatedLikedIds,
        },
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log('### [DELETE] /api/like - error : ', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
