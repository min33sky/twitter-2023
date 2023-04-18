'use client';

import useCurrentUser from '@/hooks/useCurrentUser';
import useNotifications from '@/hooks/useNotifications';
import React, { useEffect } from 'react';
import { BsTwitter } from 'react-icons/bs';

export default function NotificationsFeed() {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { error, isLoading, mutate, notifications } = useNotifications(
    currentUser?.id,
  );

  console.log('### notificationsFeed - notifications: ', notifications);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (!notifications || notifications.length === 0) {
    return (
      <div className="p-6 text-center text-xl text-neutral-600">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notifications?.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center gap-4 border-b-[1px] border-neutral-800 p-6"
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
}
