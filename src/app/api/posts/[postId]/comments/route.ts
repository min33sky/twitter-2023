import decodeJWT from '@/lib/decodeJWT';
import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { postId: string } },
) {
  const session = await decodeJWT();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { postId } = params;

  console.log('### POST /api/posts/[postId]/comments - postId : ', postId);

  if (!postId) {
    return NextResponse.json({ error: 'Post id is required' }, { status: 400 });
  }

  try {
    // 댓글 생성
    const { body } = await request.json();

    console.log('### POST /api/posts/[postId]/comments - body : ', body);

    const comment = await prisma.comment.create({
      data: {
        body,
        post: {
          connect: {
            id: postId,
          },
        },
        user: {
          connect: {
            id: session.sub,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
