'use client';

import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface Props {
  label: string;
  showBackArrow?: boolean;
}

export default function Header({ label, showBackArrow = false }: Props) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <header className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            color="white"
            className="cursor-pointer hover:opacity-80 transition"
          />
        )}
        <h1 className="text-white text-left font-semibold">{label}</h1>
      </div>
    </header>
  );
}
