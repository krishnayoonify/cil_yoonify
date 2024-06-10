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
} from "@mui/material";
import { IconSquareRoundedPlus } from "@tabler/icons";
import { toast } from "react-toastify";
import { BASE_BACKEND_URL } from "../../store/constant";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { updateAnyUserState } from "../../store/actions/userActions";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openInsitution: false,
      options: [],
      loading: false,
      searchTerm: "",
      institutionId: {
        id: this.props.user.institution_id,
        country: this.props.user.institution_country_name,
      },
      aadharCardId: "",
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      group: "4",
      users: [],
      profileImage: null,
    };
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers = () => {
    this.props.updateAnyUserState({ loading: true });
    fetch(
      `${BASE_BACKEND_URL}/api/user/get_users/?institution_id=${this.props.user.institution_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data, open: false });
      })
      .catch((error) => {
        console.error("Error fetching all users:", error);
      });
    this.props.updateAnyUserState({ loading: false });
  };
  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ profileImage: file });
  };
  fetchData = () => {
    const { searchTerm } = this.state;

    this.setState({ loading: true });

    const apiUrl = `${BASE_BACKEND_URL}/api/user/get_institutions/?search=${searchTerm}`;

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
        this.setState({ options: data });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleOpen = () => {
    this.setState({ open: true }, this.fetchData);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChangeInstitution = (event, value) => {
    this.setState({ searchTerm: value }, this.fetchData);
  };

  handleInstitutionChange = (event, newValue) => {
    this.setState({ institutionId: newValue });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCreateUser = () => {
    this.props.updateAnyUserState({ loading: true });
    const {
      institutionId,
      aadharCardId,
      userName,
      firstName,
      lastName,
      email,
      group,
      profileImage,
    } = this.state;

    // Create FormData object
    const formData = new FormData();

    // Append institution_id, aadhar_card_id, and profile_image
    formData.append("institution_id", institutionId.id);
    formData.append("aadhar_card_id", aadharCardId);
    formData.append("profile_image", profileImage);

    // Append user_data object
    const userData = {
      username: userName,
      first_name: firstName,
      last_name: lastName,
      email: email,
      groups: [group],
    };
    formData.append("user_data", JSON.stringify(userData));

    fetch(`${BASE_BACKEND_URL}/api/user/get_user/`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("User Created Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        this.setState({
          institutionId: "",
          aadharCardId: "",
          userName: "",
          firstName: "",
          lastName: "",
          email: "",
          open: "false",
        });
        this.fetchAllUsers(); // Refresh the user list after creating a new user
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.props.updateAnyUserState({ loading: false });
      });
    // .finally(() => {
    //   this.props.updateAnyUserState({ loading: false });
    // });
  };

  handleOpenInsitution = () => {
    this.setState({ openInsitution: true }, this.fetchData);
  };

  handleCloseInsitution = () => {
    this.setState({ openInsitution: false });
  };
  render() {
    const { openInsitution, open, options, loading, users } = this.state;
    const isAdmin = this.props.user.groups.some(
      (userGroup) => 2 == userGroup.id
    );
    const isSuperAdmin = this.props.user.groups.some(
      (userGroup) => 1 == userGroup.id
    );
    const isRegistrarorAdmin = this.props.user.groups.some(
      (userGroup) => 3 == userGroup.id || 3 == userGroup.id
    );

    const GroupNames = {
      1: "Super Admin",
      2: "Administrator",
      3: "Registrar",
      4: "Student",
      5: "Future Employer",
      6: "Demo",
    };
    return (
      <MainCard className="card" style={{ minHeight: "85vh" }}>
        <Modal open={open} onClose={this.handleClose} fullWidth>
          <Paper
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: "500px",
              padding: "20px",
              maxHeight: "80vh", // Set max height for scrolling
              overflowY: "auto", // Enable scrolling
              overflowX: "hidden",
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={this.handleClose}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <CloseIcon />
            </IconButton>
            <div>
              {/* Your existing form content */}
              <h2>Create New Student</h2>
              <hr />
              <Grid container spacing={2}>
                {isSuperAdmin && (
                  <Grid item xs={12} sm={12}>
                    <FormControl sx={{ m: 2, width: 430 }}>
                      <Autocomplete
                        id="institution-dropdown"
                        options={options}
                        loading={loading}
                        open={openInsitution}
                        onOpen={this.handleOpenInsitution}
                        onClose={this.handleCloseInsitution}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name +
                          ", " +
                          option.location +
                          " (" +
                          option.country +
                          ")"
                        }
                        onChange={this.handleInstitutionChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Institution"
                            variant="outlined"
                            onChange={(e) =>
                              this.handleInputChangeInstitution(
                                e,
                                params.inputProps.value
                              )
                            }
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {loading ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                )}
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ m: 2, width: 430 }}>
                    <InputLabel id="group">Group</InputLabel>
                    <Select
                      labelId="group"
                      id="group"
                      name="group"
                      value={this.state.group}
                      label="Group"
                      onChange={this.handleInputChange}
                      style={{ minWidth: "300px" }}
                    >
                      {this.props.user_groups.length &&
                        (this.props.user_groups[0].id === 1
                          ? [
                              <MenuItem value="1">Super Admin</MenuItem>,
                              <MenuItem value="2">Administrator</MenuItem>,
                              <MenuItem value="3">Registrar</MenuItem>,
                              <MenuItem value="4">Student</MenuItem>,
                            ]
                          : this.props.user_groups[0].id === 2
                          ? [
                              <MenuItem value="2">Administrator</MenuItem>,
                              <MenuItem value="3">Registrar</MenuItem>,
                              <MenuItem value="4">Student</MenuItem>,
                            ]
                          : [<MenuItem value="4">Student</MenuItem>])}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ m: 2, width: 430 }}>
                    {/* <InputLabel id="aadharCardId">Aadhar Card ID</InputLabel> */}
                    <TextField
                      id="aadharCardId"
                      name="aadharCardId"
                      value={this.state.aadharCardId}
                      onChange={this.handleInputChange}
                      label={
                        this.state.institutionId.country == "IN"
                          ? "Aadhar Card ID"
                          : "SSN"
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ m: 2, width: 430 }}>
                    {/* <InputLabel id="userName">User Name</InputLabel> */}
                    <TextField
                      id="userName"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.handleInputChange}
                      label="User Name"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ m: 2, width: 430 }}>
                    {/* <InputLabel id="firstName">First Name</InputLabel> */}
                    <TextField
                      id="firstName"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleInputChange}
                      label="First Name"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ m: 2, width: 430 }}>
                    {/* <InputLabel id="lastName">Last Name</InputLabel> */}
                    <TextField
                      id="lastName"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleInputChange}
                      label="Last Name"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ m: 2, width: 430 }}>
                    {/* <InputLabel id="email">Email</InputLabel> */}
                    <TextField
                      id="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      label="Email"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ m: 2, width: 430 }}>
                  <InputLabel id="priflephoto">Profile Photo</InputLabel>
                  <input
                    type="file"
                    onChange={this.handleFileChange}
                    accept="image/*"
                    label="Profile Photo"
                  />
                </Grid>
              </Grid>
              <div style={{ marginTop: "10px", textAlign: "right" }}>
                {/* Cancel button at the bottom */}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.handleClose}
                  style={{ marginRight: "10px" }}
                >
                  Close
                </Button>
                {/* Send button at the bottom */}

                <Button
                  sx={{ m: 2 }}
                  variant="contained"
                  color="primary"
                  onClick={this.handleCreateUser}
                >
                  Create
                </Button>
              </div>
            </div>
          </Paper>
        </Modal>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Users</h1>
          {(isAdmin || isSuperAdmin) && (
            <Button sx={{ m: 2 }} variant="contained" onClick={this.handleOpen}>
              <IconSquareRoundedPlus /> Add User
            </Button>
          )}
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>User ID</TableCell> */}
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{GroupNames[user.groups[0]]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
