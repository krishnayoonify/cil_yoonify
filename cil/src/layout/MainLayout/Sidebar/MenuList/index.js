// material-ui
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// project imports
import NavGroup from "./NavGroup";
import menuItem from "menu-items";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const user = useSelector((state) => state.user);
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case "group":
        const hasIntersection = user.groups.some((userGroup) =>
          item.group.includes(userGroup.id)
        );

        // Render NavGroup only if there is an intersection
        return hasIntersection ? (
          <NavGroup key={item.id} item={item} user={user} />
        ) : null;
      //return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
