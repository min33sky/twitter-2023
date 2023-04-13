'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BsTwitter } from 'react-icons/bs';

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.push('/')}
        className="rounded-full h-14 w-14 flex items-center justify-center hover:bg-blue-300 transition"
      >
        <BsTwitter size={28} color="white" />
      </button>
    </>
  );
};

export default SidebarLogo;
