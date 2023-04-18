import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import Avatar from '../Avatar';
import { formatDate } from '@/lib/formatDate';
import type { CommentDetail } from '@/app/types';

interface Props {
  comment: CommentDetail;
}

export default function CommentItem({
  comment: { createdAt, body, userId, user },
}: Props) {
  const router = useRouter();

  const goToUser = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      router.push(`/users/${userId}`);
    },
    [router, userId],
  );

  return (
    <div
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
        <Avatar userId={userId} />
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
              {user.name}
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
              @{user.username}
            </span>
            <span className="text-sm text-neutral-500">
              {formatDate(createdAt)}
            </span>
          </div>
          <div className="mt-1 text-white">{body}</div>
        </div>
      </div>
    </div>
  );
}
