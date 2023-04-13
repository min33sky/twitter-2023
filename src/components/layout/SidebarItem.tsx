import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
}

export default function SidebarItem({
  label,
  href,
  icon: Icon,
  onClick,
}: Props) {
  return (
    <div className="flex items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className="relative rounded-full hidden items-center gap-4 p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:flex">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-left">{label}</p>
      </div>
    </div>
  );
}
