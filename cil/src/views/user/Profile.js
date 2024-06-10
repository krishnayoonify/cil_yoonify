import React, { Component } from "react";
import MainCard from "ui-component/cards/MainCard";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Modal,
  IconButton,
  Typography,
} from "@mui/material";
import { IconSquareRoundedPlus } from "@tabler/icons";
import { toast } from "react-toastify";
import { BASE_BACKEND_URL } from "../../store/constant";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { updateAnyUserState } from "../../store/actions/userActions";
import Avatar from "@mui/material/Avatar";
import User1 from "assets/images/users/user-round.svg";
import {
  IconEye,
  IconX,
  IconCreditCard,
  IconLock,
  IconMail,
} from "@tabler/icons";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MainCard
        className="card"
        style={{ minHeight: "85vh", maxWidth: "800px" }}
      >
        <h1>My Profile</h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <Avatar
            alt={`${this.props.user.first_name.charAt(0).toUpperCase()}`}
            src={`data:image/jpeg;base64,${this.props.user.profile_image}`} // replace with your user icon image path
            sx={{ width: 40, height: 40, marginRight: 2 }}
          />

          {/* Welcome Message and user.username */}
          <div>
            <Typography
              variant="h3"
              gutterBottom
              // style={{ color: "#FFFFFF" }}
            >
              {`${this.props.user.first_name
                .charAt(0)
                .toUpperCase()}${this.props.user.first_name.slice(
                1
              )} ${this.props.user.last_name
                .charAt(0)
                .toUpperCase()}${this.props.user.last_name.slice(1)}`}
            </Typography>
            <Typography variant="h6" style={{ color: "#525457" }}>
              {this.props.user.institution_location},{" "}
              {this.props.user.institution_name}
            </Typography>
          </div>
        </div>
        <hr />
        <Grid container alignItems="center" spacing={2}>
          {/* Left side: Email icon */}
          <Grid item xs={1}>
            <IconMail />
          </Grid>
          {/* Right side: Email ID */}
          <Grid item xs={11}>
            <Typography variant="body1" textAlign="left">
              {this.props.user.email}
            </Typography>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div style={{ textAlign: "center" }}>
              <IconCreditCard stroke={1.0} size="2.3rem" />
              <br />
              <Typography
                variant="body1"
                align="center"
                style={{ display: "inline-block" }}
              >
                <b>
                  {this.props.user.institution_country_name === "India"
                    ? "Aadhar ID"
                    : "SSN Number"}
                  :
                </b>
                <br />
               {this.props.user.institution_country_name === "India" ?
    this.props.user.aadhar_card_id
        .split("")
        .map((char, index) => (index > 0 && index % 4 === 0 ? " " : "") + char)
    :
    this.props.user.aadhar_card_id.replace(/-/g, '').replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3')
}{" "}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ textAlign: "center" }}>
              <IconLock stroke={1.0} size="2.3rem" />
              <br />

              <Typography
                variant="body1"
                align="center"
                style={{ display: "inline-block" }}
              >
                <b>ID:</b>
                <br /> {this.props.user.id}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <hr />
        <Grid container alignItems="center" spacing={2}>
          {/* Left side: Email icon */}
          <Grid item xs={3}>
            <p>First Name</p>
          </Grid>
          {/* Right side: Email ID */}
          <Grid item xs={8}>
            <Typography variant="body1" textAlign="left">
              {this.props.user.first_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          {/* Left side: Email icon */}
          <Grid item xs={3}>
            <p>Last Name</p>
          </Grid>
          {/* Right side: Email ID */}
          <Grid item xs={8}>
            <Typography variant="body1" textAlign="left">
              {this.props.user.last_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          {/* Left side: Email icon */}
          <Grid item xs={3}>
            <p>User Name</p>
          </Grid>
          {/* Right side: Email ID */}
          <Grid item xs={8}>
            <Typography variant="body1" textAlign="left">
              {this.props.user.username}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          {/* Left side: Email icon */}
          <Grid item xs={3}>
            <p>Institution</p>
          </Grid>
          {/* Right side: Email ID */}
          <Grid item xs={8}>
            <Typography variant="body1" textAlign="left">
              {this.props.user.institution_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          {/* Left side: Email icon */}
          <Grid item xs={3}>
            <p>State</p>
          </Grid>
          {/* Right side: Email ID */}
          <Grid item xs={8}>
            <Typography variant="body1" textAlign="left">
              {this.props.user.institution_location}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          {/* Left side: Email icon */}
          <Grid item xs={3}>
            <p>Country</p>
          </Grid>
          {/* Right side: Email ID */}
          <Grid item xs={8}>
            <Typography variant="body1" textAlign="left">
              {this.props.user.institution_country_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          {/* Left side: Email icon */}
          <Grid item xs={3}>
            <p>Year</p>
          </Grid>
          {/* Right side: Email ID */}
          <Grid item xs={8}>
            <Typography variant="body1" textAlign="left">
              2024
            </Typography>
          </Grid>
        </Grid>
        <hr />
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  redux_loading: state.user.loading,
  user_groups: state.user.groups,
  user: state.user,
});

const mapDispatchToProps = { updateAnyUserState };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
