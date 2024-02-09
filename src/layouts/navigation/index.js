import {
  BuildingStorefrontIcon,
  HomeIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

export const mainNavigation = [
  {
    title: 'Main',
    navigation: [
      { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    ],
  },
  {
    title: 'Manage List ',
    navigation: [
      {
        name: 'Categories',
        href: '/categories',
        icon: LinkIcon,
        current: false,
      },
      {
        name: 'Blogs',
        href: '/blogs',
        icon: LinkIcon,
        current: false,
      },
      {
        name: 'My Properties',
        href: '/my-properties',
        icon: LinkIcon,
        current: false,
      },
      {
        name: 'My Favorites',
        href: '/dashboard/my-favorites',
        icon: LinkIcon,
        current: false,
      },
      {
        name: 'My save search',
        href: '/my-save-search',
        icon: LinkIcon,
        current: false,
      },
      {
        name: 'Reviews',
        href: '/dashboard/review',
        icon: LinkIcon,
        current: false,
      },
      {
        name: 'Invoice',
        href: '/invoice',
        icon: LinkIcon,
        current: false,
        children: [
          {
            name: 'Reviews',
            href: '/review',
            icon: LinkIcon,
            current: false,
          },
        ],
      },
    ],
  },
  {
    title: 'Manage Account',
    navigation: [
      {
        name: 'Users',
        href: '/users',
        icon: BuildingStorefrontIcon,
        current: false,
      },
      {
        name: 'My Package',
        href: '/brand',
        icon: BuildingStorefrontIcon,
        current: false,
      },
      {
        name: 'My Profile',
        href: '/brand',
        icon: BuildingStorefrontIcon,
        current: false,
      },
      {
        name: 'Logout',
        href: '/brand',
        icon: BuildingStorefrontIcon,
        current: false,
      },
    ],
  },
];
