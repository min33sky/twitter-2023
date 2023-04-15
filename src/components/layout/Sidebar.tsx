import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
  const items = [
    {
      label: 'Home',
      icon: BsHouseFill,
      href: '/',
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
      auth: true,
    },
    {
      label: 'Profile',
      href: '/users/123123123123',
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <aside className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
              auth={item.auth}
            />
          ))}
          <SidebarItem
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
            label="Logout"
            icon={BiLogOut}
          />
          <SidebarTweetButton />
        </div>
        <div></div>
      </div>
    </aside>
  );
}
