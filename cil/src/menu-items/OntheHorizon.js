// assets
import DashboardIcon from "./custom-icons/dashboard-icon";
import { IconArrowLoopRight2 } from "@tabler/icons";
// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const OntheHorizon = {
  id: "OntheHorizon",
  // title: "Dashboard",
  type: "group",
  group: [1, 2, 3, 4],
  children: [
    {
      id: "OntheHorizon1",
      title: "On the Horizon",
      type: "item",
      url: "/OntheHorizon",
      icon: IconArrowLoopRight2,
      breadcrumbs: true,
      group: [1, 2, 3, 4,],
    },
  ],
};

export default OntheHorizon;
