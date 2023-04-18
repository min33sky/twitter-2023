import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import NotificationsFeed from './NotificationsFeed';

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);

  console.log('### notificationsPage - session: ', session);

  if (!session) {
    console.log('### notificationsPage - redirecting to /');
    return redirect('/');
  }

  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
  );
}
