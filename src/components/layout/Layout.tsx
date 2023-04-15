'use client';

import React from 'react';
import Sidebar from './Sidebar';
import FollowBar from './FollowBar';
import LoginModal from '../modal/LoginModal';
import RegisterModal from '../modal/RegisterModal';
import { Toaster } from 'react-hot-toast';
import EditModal from '../modal/EditModal';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Toaster />
      <LoginModal />
      <RegisterModal />
      <EditModal />

      <div className="container mx-auto h-full max-w-6xl xl:px-28">
        <div className="grid h-full grid-cols-4">
          <Sidebar />

          <main className="col-span-3 border-x-[1px] border-neutral-800 lg:col-span-2">
            {children}
          </main>

          <FollowBar />
        </div>
      </div>
    </>
  );
}
