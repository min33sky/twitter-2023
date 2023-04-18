import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import { BsDot } from 'react-icons/bs';

interface Props {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean; // 인증이 필요한 경우
  alert?: boolean; // 알림이 있는 경우
}

export default function SidebarItem({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [auth, currentUser, href, loginModal, onClick, router]);

  return (
    <div onClick={handleClick} className="flex items-center">
      <div className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="absolute -top-4 left-0 text-sky-500" size={70} />
        ) : null}
      </div>
      <div className="relative hidden cursor-pointer items-center gap-4 rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:flex">
        <Icon size={24} color="white" />
        <p className="hidden text-left text-white lg:block">{label}</p>
        {alert ? (
          <BsDot className="absolute -top-4 left-0 text-sky-500" size={70} />
        ) : null}
      </div>
    </div>
  );
}
