import React from 'react';
import Sidebar from './Sidebar';
import FollowBar from './FollowBar';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="container h-full mx-auto xl:px-28 max-w-6xl">
      <div className="grid grid-cols-4 h-full">
        <Sidebar />

        <main className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
          {children}
        </main>

        <FollowBar />
      </div>
    </div>
  );
}
