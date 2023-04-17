import { prisma } from '@/lib/prismaDB';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { postId: string } },
) {
  const { postId } = params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
