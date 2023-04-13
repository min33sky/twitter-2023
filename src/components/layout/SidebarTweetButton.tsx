'use client';

import { useCallback } from 'react';
import { FaFeather } from 'react-icons/fa';
import useLoginModal from '@/hooks/useLoginModal';

export default function SidebarTweetButton() {
  const { onOpen } = useLoginModal();

  const handleClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <div onClick={handleClick}>
      <div
        className="
      mt-6
      flex
      h-14
      w-14
      cursor-pointer
      items-center
      justify-center
      rounded-full
      bg-sky-500
      p-4
      transition
      hover:bg-opacity-80
      lg:hidden
    "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
      mt-6
      hidden
      cursor-pointer
      rounded-full
      bg-sky-500
      px-4
      py-2
      hover:bg-opacity-90
      lg:block
    "
      >
        <p
          className="
          hidden
          text-center
          text-[20px]
          font-semibold
          text-white
          lg:block
      "
        >
          Tweet
        </p>
      </div>
    </div>
  );
}
