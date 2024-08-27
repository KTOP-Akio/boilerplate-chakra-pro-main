// Auth Imports
import { IRoute } from '@/types/types';
import { Icon } from '@chakra-ui/react';
import {
  MdCreditCard,
  MdHome,
  MdOutlineManageAccounts,
  MdWorkspacePremium,
} from 'react-icons/md';

export const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    path: '/dashboard/main',
    icon: (
      <Icon as={MdHome} mt="-7px" width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  {
    name: 'AI Pages',
    path: '/ai-pages',
    icon: (
      <Icon
        as={MdWorkspacePremium}
        mt="-7px"
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    collapse: true,
    items: [
      {
        name: 'AI Generator',
        path: '/dashboard/ai-generator',
        collapse: false,
      },
      {
        name: 'AI Assistant',
        path: '/dashboard/ai-assistant',
        collapse: false,
      },
      {
        name: 'AI Chat',
        path: '/dashboard/ai-chat',
        collapse: false,
      },
    ],
  },
  {
    name: 'Users List',
    path: '/dashboard/users-list',
    icon: (
      <Icon height="24px" viewBox="0 -960 960 960" width="24px" mt="-7px">
        <path
          fill="currentColor"
          d="M640-400q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM400-160v-76q0-21 10-40t28-30q45-27 95.5-40.5T640-360q56 0 106.5 13.5T842-306q18 11 28 30t10 40v76H400Zm86-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T680-520q0-17-11.5-28.5T640-560q-17 0-28.5 11.5T600-520q0 17 11.5 28.5T640-480Zm0-40Zm0 280ZM120-400v-80h320v80H120Zm0-320v-80h480v80H120Zm324 160H120v-80h360q-14 17-22.5 37T444-560Z"
        ></path>
      </Icon>
    ),
    collapse: false,
  },
  {
    name: 'Profile Settings',
    path: '/dashboard/settings',
    icon: (
      <Icon
        mt="-7px"
        as={MdOutlineManageAccounts}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    collapse: false,
  },
  {
    name: 'Subscription',
    path: '/dashboard/subscription',
    icon: (
      <Icon
        mt="-7px"
        as={MdCreditCard}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    collapse: false,
  },
];
