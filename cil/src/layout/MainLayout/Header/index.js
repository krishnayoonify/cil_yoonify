import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, Typography, Divider } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";

// assets
import { IconMenu2 } from "@tabler/icons";
import MenuIcon from "./menu-icon";
import { borderRadius, fontSize } from "@mui/system";
// ==============================|| MAIN NAVBAR / HEADER ||============================== //
import { Link } from "react-router-dom";

const Header = ({
  handleLeftDrawerToggle,
  loggedin,
  groups,
  future_employer_email,
}) => {
  const theme = useTheme();
  const appBarStyle = {
    backgroundColor: '#0E1635',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle = {
    flexGrow: 1,
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    marginLeft: '1rem',
    color: 'white',
    backgroundColor: '#FF6400',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '19px',
  };

  const signUpButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#FF6400',
    borderRadius:'30px'
  };
  const signInButtonStyle = {
    backgroundColor: 'rgb(255, 100, 0)',
    color: "#ff6b00",
    borderColor: "rgb(255, 100, 0)",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "19px",
    borderRadius: "30px",
    background: "transparent",
    borderRadius:'30px'
  };
  
  return (
    <>
      {/* logo & toggler button */}
      <div style={appBarStyle}>
      {/* <div>
        <button style={{ ...buttonStyle, backgroundColor: 'transparent' }}>Home</button>
          <button style={{ ...buttonStyle, backgroundColor: 'transparent' }}>History</button>
          <Link
                        to={`/tenders`}
            // style={linkStyle}
            style={{ ...buttonStyle, backgroundColor: 'transparent' }}
                      >Tenders</Link>
        <button style={{ ...buttonStyle, backgroundColor: 'transparent' }}>About Us</button>
      </div> */}
      </div>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          width: 500, //228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          //sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
          display={{ xs: "none", md: "flex" }}
          alignItems="center"
        >
          <LogoSection />
          
        </Box>

        {/* <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.dark,
              color: theme.palette.secondary.light,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <MenuIcon />
          </Avatar>
        </ButtonBase> */}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
        <div style={appBarStyle}>
        {/* {loggedin && <div>
          <button style={signInButtonStyle}>Sign In</button>
          <button style={signUpButtonStyle}>Sign Up</button>
        </div>} */}
    </div>
      {/* header search */}
      

      {/* notification & profile */}
      {/* <NotificationSection /> */}
      {/* <ProfileSection /> */}
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
