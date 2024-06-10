// assets
import DashboardIcon from "./custom-icons/dashboard-icon";
import { IconLayoutDashboard } from "@tabler/icons";
// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  // title: "Dashboard",
  type: "group",
  group: [1, 2, 3, 4],
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/",
      icon: IconLayoutDashboard,
      breadcrumbs: true,
      group: [1, 2, 3, 4],
    },
  ],
};

export default dashboard;
