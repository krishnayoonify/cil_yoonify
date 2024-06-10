import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { IconCreditCard, IconEye, IconX } from "@tabler/icons";
import { BASE_BACKEND_URL } from "../../store/constant";
import { connect } from "react-redux";
import { updateAnyUserState } from "../../store/actions/userActions";
import CloseIcon from "@mui/icons-material/Close";
import { IconSquareRoundedPlus, IconLock } from "@tabler/icons";
import "./ViewCred.css";
import User1 from "assets/images/users/user-round.svg";
import MainCard from "ui-component/cards/MainCard";
import Avatar from "@mui/material/Avatar";

class UploadStudentCreds extends Component {
  state = {
    searchTerm: "",
    loading: false,
    users: [],
  };

  componentDidMount() {
    this.fetchUsersData();
  }
  handleInputChange = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm }, () => {
      // Call the API to fetch user data based on the search term
      this.fetchUsersData();
    });
  };

  fetchUsersData = () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    const apiUrl = `${BASE_BACKEND_URL}/api/user/get_users/?institution_id=${this.props.institution_id}&search=${searchTerm}`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ users: data });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { searchTerm, loading, users } = this.state;
    const linkStyle = {
      textDecoration: "none", // Remove default link underline
      color: "inherit", // Inherit color from parent
    };
    return (
      <div>
        <h1>Students</h1>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={this.handleInputChange}
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <div style={{ display: "flex", flexWrap: "wrap", margin:"10px 20px" }}>
            {users.map(
              (user, index) =>
                user.groups[0] === 4 && (
                  <Grid item key={user.id} xs={12} sm={12} md={4} xl={3} style={{marginTop:'20px'}}>
                    <MainCard
                      className="card"
                      style={{
                        background:
                          "linear-gradient(to bottom, #07172e 75px, white 20%)",
                        maxWidth: "370px",
                        minWidth:'320px',
                        marginLeft:"10px",
                        padding: "0",
                        
                        display: "flex",
                        flexDirection: "column", // Ensure cards are displayed as columns
                        height: "100%", // Make cards stretch to fill the container height
                        
                      }}
                    >
                      <Link
                        to={`/student-credentials/${user.id}`}
                        style={linkStyle}
                      >
                        <CardContent style={{ padding: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginBottom: "20px",
                              position: "relative",
                            }}
                          >
                            <div>
                              {/* <img
                                src={`data:image/jpeg;base64,${user.profile_image}`}
                                alt={user.profile_image}
                                class="avatar img-responsive"
                                style={{ width: "300px" }}
                              /> */}
                              <Avatar
                                alt={`${user.first_name
                                  .charAt(0)
                                  .toUpperCase()}`}
                                src={`data:image/jpeg;base64,${user.profile_image}`} // replace with your user icon image path
                                sx={{
                                  width: "80px",
                                  height: "80px",
                                  border: "2px solid",
                                }}
                              />
                            </div>
                          </div>
                          <Typography
                            variant="h5"
                            style={{
                              textAlign: "center",
                              marginBottom: "10px",
                            }}
                          >
                            {`${user.first_name
                              .charAt(0)
                              .toUpperCase()}${user.first_name.slice(
                              1
                            )} ${user.last_name
                              .charAt(0)
                              .toUpperCase()}${user.last_name.slice(1)}`}
                          </Typography>
                          <Typography
                            variant="h5"
                            style={{
                              textAlign: "center",
                              marginBottom: "10px",
                              color: "#525457",
                            }}
                          >
                            {user.email}
                          </Typography>
                        
                          <hr
                style={{
                  margin: "20px 0",
                  borderTop: "2px solid black",
                  ...(index === 1 && { borderTopWidth: "1px" }), // Conditionally adjust the border thickness for the first hr
                }}/>
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
                                  {this.props.user.institution_country_name ===
                                  "India"
                                    ? "Aadhar ID"
                                    : "SSN Number"}
                                  <br />{" "}
                                  {user.institution_country_name !== "India" ?
    user.aadhar_card_id
        .split("")
        .map((char, index) => (index > 0 && index % 4 === 0 ? " " : "") + char)
    :
    user.aadhar_card_id.replace(/-/g, '').replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3')
}
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
                                  <b>Student ID:</b>
                                  <br /> {user.id}
                                </Typography>
                              </div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Link>
                    </MainCard>
                  </Grid>
                )
            )}</div>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  institution_id: state.user.institution_id,
  user: state.user,
});

const mapDispatchToProps = { updateAnyUserState };

export default connect(mapStateToProps, mapDispatchToProps)(UploadStudentCreds);
