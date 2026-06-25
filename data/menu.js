import { Icons } from "./icons";

export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: Icons.dashboard,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Manage Reports",
    icon: Icons.reports,
    path: "/reports",
  },
  {
    id: 3,
    title: "Admin Menu",
    icon: Icons.admin,
    children: [
      {
        id: 31,
        title: "Master Data",
        path: "/master-data",
      },
      {
        id: 32,
        title: "Manage Time Period",
        path: "/manage-time-period",
      },
      {
        id: 33,
        title: "Manage Users",
        path: "/manage-users",
      },
    ],
  },
];