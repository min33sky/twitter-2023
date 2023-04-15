import type { UserDetail } from '@/app/types';
import Header from '@/components/Header';
import React from 'react';
import UserHero from './UserHero';

interface Props {
  params: {
    userId: string;
  };
}

export default async function UserDetail({ params: { userId } }: Props) {
  const user = await getUser(userId);

  console.log('### userDetail : ', user);

  return (
    <>
      <Header showBackArrow label={user.name || '사용자 이름'} />
      <UserHero user={user} />
    </>
  );
}

async function getUser(userId: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/users/${userId}`);
  const user: UserDetail = await res.json();

  return user;
}
