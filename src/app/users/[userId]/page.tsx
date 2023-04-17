import type { UserDetail } from '@/app/types';
import Header from '@/components/Header';
import React from 'react';
import UserHero from './UserHero';
import UserBio from './UserBio';

interface Props {
  params: {
    userId: string;
  };
}

export default async function UserDetail({ params: { userId } }: Props) {
  const user = await getUser(userId);

  // console.log('### userDetail : ', user);

  return (
    <>
      <Header showBackArrow label={user.name || '사용자 이름'} />
      <UserHero user={user} />
      <UserBio user={user} />
    </>
  );
}

async function getUser(userId: string) {
  //? 캐시때문에 수정해도 반영이 안되므로 캐시를 무효화시키는 방법을 사용해야함

  const res = await fetch(`${process.env.BASE_URL}/api/users/${userId}`, {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  const user: UserDetail = await res.json();

  return user;
}
