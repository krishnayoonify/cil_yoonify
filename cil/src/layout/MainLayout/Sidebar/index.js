import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Chip, Drawer, Stack, useMediaQuery } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import User1 from "assets/images/users/user-round.svg";
import Typography from "@mui/material/Typography";
// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";

// project imports
import MenuList from "./MenuList";
import LogoSection from "../LogoSection";
import { drawerWidth } from "store/constant";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../ui-component/yoonify-orange-dark.png";
import { Divider } from "@mui/material";
// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", margin: "20px 0" }}
          >
            {user.future_employer_email ? (
              <Avatar
                alt={`${
                  user.future_employer_email
                    ? user.future_employer_email.charAt(0).toUpperCase()
                    : "A"
                }`}
                src={`data:image/jpeg;base64,123`} // replace with your user icon image path
                sx={{ width: 40, height: 40, marginRight: 2 }}
              />
            ) : (
              <Avatar
                alt={`${
                  user.first_name && user.first_name.length > 0 // Add check if first_name exists and is not empty
                    ? user.first_name.charAt(0).toUpperCase()
                    : "A"
                }`}
                src={`data:image/jpeg;base64,${user.profile_image}`} // replace with your user icon image path
                sx={{ width: 40, height: 40, marginRight: 2 }}
              />
            )}

            {/* Welcome Message and user.username */}
            <div>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: "#FFFFFF" }}
              >
                Welcome
              </Typography>
              <Typography variant="h3" style={{ color: "#FFFFFF" }}>
                {user.future_employer_email
                  ? `${user.future_employer_email
                      .charAt(0)
                      .toUpperCase()}${user.future_employer_email.slice(1)}`
                  : `${
                      user.first_name && user.first_name.length > 0
                        ? user.first_name.charAt(0).toUpperCase() +
                          user.first_name.slice(1)
                        : ""
                    } ${
                      user.last_name && user.last_name.length > 0
                        ? user.last_name.charAt(0).toUpperCase() +
                          user.last_name.slice(1)
                        : ""
                    }`}
                {}
              </Typography>
            </div>
          </div>
          <MenuList />
          {/* <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip
              label={process.env.REACT_APP_VERSION}
              disabled
              chipcolor="secondary"
              size="small"
              sx={{ cursor: "pointer" }}
            />
          </Stack> */}
          <div style={{ marginTop: "auto", textAlign: "center" }}>
            <div
              className="powered-by"
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Add this line for horizontal centering
              }}
            >
              <p style={{ color: "white", fontWeight: "bold" }}>Powered by: </p>
              <img src={logo} alt="yoonify" width="70px" />
            </div>
            <Divider
              sx={{
                mt: 0.25,
                mb: 1.25,
              }}
              style={{ borderColor: "rgb(234 240 254 / 47%)" }}
            />
            <p style={{ fontSize: "11px" }}>
              Copyright 2024 Yoonify All rights reserved
            </p>
          </div>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip
              label={process.env.REACT_APP_VERSION}
              disabled
              chipcolor="secondary"
              size="small"
              sx={{ cursor: "pointer" }}
            />
          </Stack>
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#264D92",
            color: "#FFFF",
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "85px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
