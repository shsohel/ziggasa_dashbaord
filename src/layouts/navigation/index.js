import {
  BuildingStorefrontIcon,
  HomeIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

export const mainNavigation = [
  {
    title: "Main",
    navigation: [
      { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
    ],
  },
  {
    title: "Manage List ",
    navigation: [
      {
        name: "Category",
        href: "/categories",
        icon: LinkIcon,
        current: false,
      },
      {
        name: "Tag",
        href: "/tags",
        icon: LinkIcon,
        current: false,
      },
      {
        name: "Keyword",
        href: "/keywords",
        icon: LinkIcon,
        current: false,
      },
      {
        name: "Jobs",
        href: "/jobs",
        icon: LinkIcon,
        current: false,
      },
      {
        name: "Blogs",
        href: "/blogs",
        icon: LinkIcon,
        current: false,
      },
      // {
      //   name: 'My Properties',
      //   href: '/my-properties',
      //   icon: LinkIcon,
      //   current: false,
      // },
      // {
      //   name: 'My Favorites',
      //   href: '/dashboard/my-favorites',
      //   icon: LinkIcon,
      //   current: false,
      // },
      // {
      //   name: 'My save search',
      //   href: '/my-save-search',
      //   icon: LinkIcon,
      //   current: false,
      // },
      {
        name: "Comments",
        href: "/dashboard/review",
        icon: LinkIcon,
        current: false,
      },
    ],
  },
  {
    title: "Manage Account",
    navigation: [
      {
        name: "Users",
        href: "/users",
        icon: BuildingStorefrontIcon,
        current: false,
      },

      {
        name: "My Profile",
        href: "/brand",
        icon: BuildingStorefrontIcon,
        current: false,
      },
      {
        name: "Logout",
        href: "/brand",
        icon: BuildingStorefrontIcon,
        current: false,
      },
    ],
  },
];
