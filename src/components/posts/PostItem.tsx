import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { formatDate } from '@/lib/formatDate';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import Avatar from '../Avatar';
import { PostDetail } from '@/app/types';
import useLike from '@/hooks/useLike';

interface Props {
  post: PostDetail;
  userId?: string;
}

export default function PostItem({ post, userId }: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: post.id, userId });

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

  const onLike = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [currentUser, loginModal, toggleLike],
  );

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

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
              {post.user.name}
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
              @{post.user.username}
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
              <p>{post.comments?.length || 0}</p>
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
              <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
              <p>{post.likeIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
