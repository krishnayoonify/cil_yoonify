// assets
import {
  IconKey,
  IconUserPlus,
  IconUser,
  IconClipboardText,
} from "@tabler/icons";
import AuthKeyIcon from "./custom-icons/authkey-icon";
import UserPlusIcon from "./custom-icons/userplus-icon";
import UploadIcon from "./custom-icons/upload-icon";
import ViewUploadIcon from "./custom-icons/view-upload";
const icons = { IconKey, IconUserPlus, IconUser };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const credentials = {
  id: "credentialManagement",
  // title: "Credential Management",
  type: "group",
  group: [1, 2, 3, 4, 5],
  children: [
    {
      id: "viewcreds",
      title: "My Credentials",
      type: "item",
      url: "credentials",
      icon: IconClipboardText,
      breadcrumbs: false,
      group: [4],
    },
    {
      id: "uploadcreds",
      title: "Students",
      type: "item",
      url: "student-credentials",
      icon: IconClipboardText,
      breadcrumbs: false,
      group: [1, 2, 3],
    },
    // {
    //   id: "viewcreds",
    //   title: "View Credentials",
    //   type: "item",
    //   url: "view-creds",
    //   icon: IconClipboardText,
    //   breadcrumbs: false,
    //   group: [4],
    // },
    {
      id: "viewcreds",
      title: "View Credentials",
      type: "item",
      url: "student_creds",
      icon: IconClipboardText,
      breadcrumbs: false,
      group: [5],
    },
  ],
};

export default credentials;
