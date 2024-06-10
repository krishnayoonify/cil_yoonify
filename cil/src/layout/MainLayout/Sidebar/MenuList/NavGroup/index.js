import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, List, Typography } from "@mui/material";

// project imports
import NavItem from "../NavItem";
import NavCollapse from "../NavCollapse";

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item, user }) => {
  const theme = useTheme();

  // menu list collapse & items
  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case "collapse":
        return <NavCollapse key={menu.id} menu={menu} level={1} user={user} />;
      case "item":
        const hasIntersection = user.groups.some((userGroup) =>
          item.group.includes(userGroup.id)
        );

        // Render NavGroup only if there is an intersection
        return hasIntersection ? (
          <NavItem key={menu.id} item={menu} level={1} user={user} />
        ) : null;
      // return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        style={{ padding: "0" }}
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.menuCaption }}
              display="block"
              color="#fff"
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  color="#fff"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider
        sx={{
          mt: 0.25,
          mb: 1.25,
        }}
        style={{ borderColor: "rgb(234 240 254 / 47%)" }}
      />
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
