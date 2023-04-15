import useUsers from '@/hooks/useUsers';
import React from 'react';
import Avatar from '../Avatar';

export default function FollowBar() {
  const { users } = useUsers();

  if (!users || users.length === 0) return null;

  return (
    <div className="hidden px-6 py-4 lg:block">
      <div className="rounded-xl bg-neutral-800 p-4">
        <h2 className="text-xl font-semibold text-white">팔로우 추천</h2>
        <div className="mt-4 flex flex-col gap-6">
          {users.map((user) => (
            <div key={user.id} className="flex gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-sm text-neutral-400">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
