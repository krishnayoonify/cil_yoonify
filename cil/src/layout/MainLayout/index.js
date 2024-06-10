import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

// project imports
import Breadcrumbs from "ui-component/extended/Breadcrumbs";
import Header from "./Header";
import Sidebar from "./Sidebar";
import navigation from "menu-items";
import { drawerWidth } from "store/constant";
import { SET_MENU } from "store/actions/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// assets
import { IconChevronRight } from "@tabler/icons";
import { InfinitySpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Logo from "ui-component/Logo";
// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create(
      "margin",
      open
        ? {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }
        : {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }
    ),
    [theme.breakpoints.up("md")]: {
      marginLeft: open ? 0 : -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
      marginRight: "10px",
    },
  })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  const { token } = useParams();

  useEffect(() => {
    // Dispatch the action to check the login status when the component mounts
    if (token) {
      dispatch({ type: "GET_FUTURE_EMPLOYER", payload: { token: token } });
    } else {
      dispatch({ type: "GET_USER" });
    }
  }, [dispatch]);

  return (
    <>
      {user.loggedin || token || user.future_employer_email ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            enableColorOnDark
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
              bgcolor: "#07172E",
              transition: leftDrawerOpened
                ? theme.transitions.create("width")
                : "none",
            }}
          >
            <Toolbar>
              <Header
                handleLeftDrawerToggle={handleLeftDrawerToggle}
                loggedin={user.loggedin}
                groups={user.groups}
                future_employer_email={user.future_employer_email}
              />
            </Toolbar>
          </AppBar>

          {/* <Sidebar
            drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
            drawerToggle={handleLeftDrawerToggle}
            token={token}
          /> */}
          <Main
            theme={theme}
            open={leftDrawerOpened}
            style={{ backgroundColor: "#ebf1ff" }}
          >
            {/* breadcrumb */}
            <Breadcrumbs
              separator={IconChevronRight}
              navigation={navigation}
              icon
              title
              rightAlign
            />
            <Outlet />
          </Main>
        </Box>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            enableColorOnDark
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
              bgcolor: "#07172E",
              transition: leftDrawerOpened
                ? theme.transitions.create("width")
                : "none",
            }}
          >
              <Toolbar style={ {display: 'flex',justifyContent: 'center',}}>
              <Logo />
            </Toolbar>
          </AppBar>

          
          <Main
            // theme={theme}
            // open={leftDrawerOpened}
            style={{ backgroundColor: "#ebf1ff", flexGrow: '1', padding:'0', margin:'0', width: '125px' }}
          >
            
            <Outlet />
          </Main>
        </Box>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {user.loading && (
        <div className="loader-container">
          <InfinitySpin
            width="200"
            color="#07172E"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      )}
    </>
  );
};

export default MainLayout;
