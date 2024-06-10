// assets
// import DashboardIscon from "./custom-icons/profile-icon";
import { IconSettings } from "@tabler/icons";

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const profile = {
  id: "profile",
  // title: "Dashboard",
  type: "group",
  group: [1, 2, 3, 4],
  children: [
    {
      id: "profile",
      title: "Profile",
      type: "item",
      url: "/profile",
      icon: IconSettings,
      breadcrumbs: true,
      group: [1, 2, 3, 4],
    },
  ],
};

export default profile;
