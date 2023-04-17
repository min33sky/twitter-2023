import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { formatDate } from '@/lib/formatDate';
import { Post } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import Avatar from '../Avatar';
import { PostDetail } from '@/app/types';

interface Props {
  post: PostDetail;
  userId?: string;
}

export default function PostItem({ post, userId }: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  // TODO: useLike

  const goToUser = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      router.push(`/users/${post.userId}`);
    },
    [post.userId, router],
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${post.id}`);
  }, [post.id, router]);

  const onLike = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: like
    alert('like');
  }, []);

  return (
    <div
      onClick={goToPost}
      className="
        cursor-pointer
        border-b-[1px]
        border-neutral-800
        p-5
        transition
        hover:bg-neutral-900
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={post.userId} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                cursor-pointer
                font-semibold
                text-white
                hover:underline
            "
            >
              이름
            </p>
            <span
              onClick={goToUser}
              className="
                hidden
                cursor-pointer
                text-neutral-500
                hover:underline
                md:block
            "
            >
              @유저네임
            </span>
            <span className="text-sm text-neutral-500">
              {formatDate(post.createdAt)}
            </span>
          </div>
          <div className="mt-1 text-white">{post.body}</div>
          <div className="mt-3 flex flex-row items-center gap-10">
            <div
              className="
                flex
                cursor-pointer
                flex-row
                items-center
                gap-2
                text-neutral-500
                transition
                hover:text-sky-500
            "
            >
              <AiOutlineMessage size={20} />
              댓글 갯수 : 1557
              {/* <p>{post.comments?.length || 0}</p> */}
            </div>
            <div
              onClick={onLike}
              className="
                flex
                cursor-pointer
                flex-row
                items-center
                gap-2
                text-neutral-500
                transition
                hover:text-red-500
            "
            >
              {/* <LikeIcon color={hasLiked ? 'red' : ''} size={20} /> */}
              <p>
                좋아요 수 : 1557
                {/* {data.likedIds.length} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
