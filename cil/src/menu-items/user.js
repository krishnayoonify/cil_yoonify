// assets
import { IconUser } from "@tabler/icons";
import AuthKeyIcon from "./custom-icons/authkey-icon";
import UserPlusIcon from "./custom-icons/userplus-icon";
import UploadIcon from "./custom-icons/upload-icon";
import ViewUploadIcon from "./custom-icons/view-upload";

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const user = {
  id: "userManagement",
  // title: "User Management",
  type: "group",
  group: [1, 2, 3],
  children: [
    {
      id: "createuser",
      title: "Users",
      type: "item",
      url: "users",
      icon: IconUser,
      breadcrumbs: false,
      group: [1, 2, 3],
    },
  ],
};

export default user;
