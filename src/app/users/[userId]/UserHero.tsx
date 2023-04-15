import { UserDetail } from '@/app/types';
import Avatar from '@/components/Avatar';
import Image from 'next/image';
import React from 'react';

interface Props {
  user: UserDetail;
}

export default function UserHero({ user }: Props) {
  return (
    <>
      <div className="relative h-44 bg-neutral-700">
        {user.coverImage && (
          <Image
            src={user.coverImage}
            fill
            alt="cover image"
            style={{
              objectFit: 'cover',
            }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={user.id} isLarge hasBorder />
        </div>
      </div>
    </>
  );
}
