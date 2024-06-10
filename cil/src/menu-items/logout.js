// assets
import DashboardIcon from "./custom-icons/dashboard-icon";
import { IconLogout } from "@tabler/icons";
// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const logout = {
  id: "logout",
  // title: "Dashboard",
  type: "group",
  group: [1, 2, 3, 4, 5, 6],
  children: [
    {
      id: "logoutDefault",
      title: "Logout",
      type: "item",
      url: "/",
      icon: IconLogout,
      breadcrumbs: false,
      group: [1, 2, 3, 4, 5, 6],
    },
  ],
};

export default logout;
