'use client';

import type { UserDetail } from '@/app/types';
import { BiCalendar } from 'react-icons/bi';
import Button from '@/components/Button';
import useCurrentUser from '@/hooks/useCurrentUser';
import { formatDate } from '@/lib/formatDate';
import useEditModal from '@/hooks/useEditModal';
import useFollow from '@/hooks/useFollow';

interface Props {
  user: UserDetail;
}

export default function UserBio({
  user: { name, bio, createdAt, id, username, followersCount, followingIds },
}: Props) {
  const { data: currentUser } = useCurrentUser();
  const editModal = useEditModal();

  // TODO: Follow Function
  const { isFollowing, toggleFollow } = useFollow(id);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === id ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? 'Unfollow' : 'Follow'}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-white">{name}</p>
          <p className="text-base text-neutral-400">@{username}</p>
        </div>

        <div className="mt-4 flex flex-col">
          <p className="text-white">{bio || '자기소개를 입력해주세요.'}</p>
          <div className="mt-4 flex items-center gap-2 text-neutral-400">
            <BiCalendar size={24} />
            <p>Joined {createdAt && formatDate(createdAt)}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-row items-center gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{followingIds?.length}</p>
            <p className="text-neutral-400">팔로우</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{followersCount || 0}</p>
            <p className="text-neutral-400">팔로워</p>
          </div>
        </div>
      </div>
    </div>
  );
}
