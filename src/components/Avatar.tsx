'use client';

import useUser from '@/hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

interface Props {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

export default function Avatar({
  userId,
  isLarge = false,
  hasBorder = false,
}: Props) {
  const router = useRouter();

  const { user } = useUser(userId);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      router.push(`/users/${userId}`);
    },
    [router, userId],
  );

  return (
    <div
      className={`
      ${hasBorder ? 'border-4 border-black' : ''}
      ${isLarge ? 'h-32' : 'h-12'}
      ${isLarge ? 'w-32' : 'w-12'}
      relative
      cursor-pointer
      rounded-full
      transition
      hover:opacity-90
      `}
    >
      <Image
        src={user?.profileImage || '/images/placeholder.png'}
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        onClick={handleClick}
        alt="Avatar"
      />
    </div>
  );
}
