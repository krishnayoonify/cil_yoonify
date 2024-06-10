import React, { Component } from "react";
import MainCard from "ui-component/cards/MainCard";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Button,
  Autocomplete,
  CircularProgress,
  Modal,
  IconButton,
  Typography,
  CardActions,
  Checkbox,
} from "@mui/material";
import { toast } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  IconEye,
  IconX,
  IconCreditCard,
  IconLock,
  IconMail,
} from "@tabler/icons";
import { BASE_BACKEND_URL } from "../../store/constant";
import { connect } from "react-redux";
import { updateAnyUserState } from "../../store/actions/userActions";
import CloseIcon from "@mui/icons-material/Close";
import { IconSquareRoundedPlus } from "@tabler/icons";
import ShareCredModal from "./ShareCredModal";
import "./ViewCred.css";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import User1 from "assets/images/users/user-round.svg";

const categories = [
  {
    CategoryId: "1001",
    "NCRF category":
      "Undergraduate Certificate Programme duration: first year (first two semesters) of any undergraduate programme",
    "NCRF short category": "Bachelor's Degree: First Year (2 Sems)",
    TokenURL:
      "https://gateway.pinata.cloud/ipfs/QmWYyNkyD22uWoHwtiZzmdmZukSfzZQzb7zba29hAUbZSL",
    MetadataURL:
      "https://gateway.pinata.cloud/ipfs/QmayCSsfXXUiordgEPJeG94cB8ULNFHSgunp1N2su85JxF",
  },
  {
    CategoryId: "1002",
    "NCRF category":
      "Undergraduate Diploma Programme duration: first two years (first four semesters) of any undergraduate programme.",
    "NCRF short category": "Bachelor's Degree: First Two Years (4 Sems)",
    TokenURL:
      "https://gateway.pinata.cloud/ipfs/QmQqfojEKBXau7fuAmj47nSkm9v98QeP9TL2DMgf4YVUxe",
    MetadataURL:
      "https://gateway.pinata.cloud/ipfs/QmQJ5FJzor9fH1gZNSh5rojQEyWPaZzAkEYG6CUr32NAXD",
  },
  {
    CategoryId: "1003",
    "NCRF category":
      "Bachelor's Degree Programme duration: three years (Six semesters) of any undergraduate programme.",
    "NCRF short category":
      "Bachelor's Degree: Final/ First Three  Years (6 Sems)",
    TokenURL:
      "https://gateway.pinata.cloud/ipfs/QmWGm973NzL1AK8utojuYQ5os3QSnMQ2XeLfndDZToTWa6",
    MetadataURL:
      "https://gateway.pinata.cloud/ipfs/QmPGh1yTK4HvxdPeAvR1xoS7w6UcCEZDeCyyLFakqwvwHt",
  },
  {
    CategoryId: "1004",
    "NCRF category":
      "Bachelor's Degree (Honours/ research/ Engineering). Programme duration: four years (eight semesters) of any undergraduate programme.",
    "NCRF short category": "Bachelor's Degree: Final/ Four  Years (8 Sems)",
    TokenURL:
      "https://gateway.pinata.cloud/ipfs/QmZjCtdYBSBJhLZnXXyLjjhQfWYMD85BbMZWeYMZ5Ym9a2",
    MetadataURL:
      "https://gateway.pinata.cloud/ipfs/QmRwiLM9fyBxMnqPjRDQpbMKtQZWsrPXY37KBB6YphQPx5",
  },
  {
    CategoryId: "1005",
    "NCRF category":
      "Post-Graduate Diploma: PGD after 3-year Bachelor degree/ 2 semesters of the 2-year master's degree programme.",
    "NCRF short category":
      "Post-Graduation (Diploma after 3 yr Bachelor's Degree): First Year (2 Sems)",
    TokenURL:
      "http://ipfs.io/ipfs/QmXuvPxY4ENVrDMBjaqp6WKxrtX3YBNvGQLRMgLaNrBno8",
    MetadataURL:
      "https://gateway.pinata.cloud/ipfs/Qmb7zs8vdmKi1iSGiavkdjfLPqLCJFzVc3JjJb6hkgvMDc",
  },
  {
    CategoryId: "1006",
    "NCRF category": "Post-Post-Graduate : PGD after 4-year bachelor degree",
    "NCRF short category":
      "Post-Graduation (Diploma after 4 yr Bachelor's Degree): First Year (2 Sems)",
    TokenURL:
      "https://gateway.pinata.cloud/ipfs/QmTiFmLXTqzke8z4R1MQkvKLBXgh2fVRWNUqxaz8N9Rovd",
    MetadataURL:
      "https://gateway.pinata.cloud/ipfs/QmaDByPX9VFKE4PMrjAJbfLC32BbzefQVp8XnkD8ebeqcg",
  },
  {
    CategoryId: "1007",
    "NCRF category":
      "Master's Degree. Programme duration: One year (twosemesters) after obtaining a Bachelor's degree (Honours/Research).",
    "NCRF short category": "Master's Degree: First Year (2 Sems)",
    TokenURL:
      "https://gateway.pinata.cloud/ipfs/QmUJj2bfePhtxT3bhhD4Bob6gQV4kDXNf3RY5ym2h9zd2K",
    MetadataURL:
      "https://gateway.pinata.cloud/ipfs/QmQEnUbGodTPkWg2mQFbrfYzuTCaD79rN9GMeCWY9ZuwB8",
  },
  {
    CategoryId: "1008",
    "NCRF category":
      "Master's Degree. Programme duration: two years (four semesters) after obtaining a 3 yr Bachelor's degree",
    "NCRF short category":
      "Master's Degree (Honours / Research): Final Year (4 Sems)",
    TokenURL:
      "http://ipfs.io/ipfs/QmYAZYhQnweBJ6NmSPPLe9eUegXADVvoiGh27xN8ARpWF1",
    MetadataURL:
      "https://gateway.pinata.cloud/ipfs/QmSrkb6nY7rfJMQjPQErqSA2NbRfWyoZyu4FfbhjXPD8h9",
  },
  {
    CategoryId: "1009",
    "NCRF category":
      "Master's degree; Programme duration: two years (four semesters) after obtaining a Bachelor's Engineering degree.",
    "NCRF short category": "Master's Degree (Engineering): Final Year (4 Sems)",
    TokenURL:
      "https://gateway.pinata.cloud/ipfs/QmeohqE9WMq8wfwS4DVNbvJCpAeJXw5q835RsfRFFQH3sS",
    MetadataURL:
      "http://ipfs.io/ipfs/QmZs9MQxdxPvthpnLdwzfJFzY1g3fiyPHgqkCgkSMURDkW",
  },
  {
    CategoryId: "1010",
    "NCRF category": "Doctoral degree",
    "NCRF short category": "	Ph.D/Doctoral Degree",
    TokenURL:
      "https://gateway.pinata.cloud/ipfs/QmTf44NTGQMxTQT1GKJhpyLyA4S27mS79mXnoQGigGAZGp",
    MetadataURL:
      "https://gateway.pinata.cloud/ipfs/QmZeWsN3GhqEkYEsPVNnvMfvADcsNzYB8HpdRSNuzdBjXE",
  },
];
class UploadStudentCredsNew extends Component {
  state = {
    documentType: "",
    documentFile: null,
    year: new Date().toISOString().split("T")[0],
    previewUrl: "",
    showPreview: false,
    open: false,
    options: [],
    loading: false,
    searchTerm: "",
    selectedUser: { id: this.props.user_id },
    openCredentials: false,
    isModalOpen: false,
    data: [],
    selectedFile: null,
    selectedItems: [],
    email: "",
    emailError: "",
    emailIsValid: false,
  };

  handleOpenCredentials = () => {
    this.setState({ openCredentials: true }, this.fetchUsersData);
  };

  handleCloseCredentials = () => {
    this.setState({ openCredentials: false });
  };

  componentDidMount() {
    this.fetchCredentials();
    this.fetchUserData();
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleOpenModal = () => {
    this.openModal();
  };

  handleViewClick = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  fetchCredentials = async () => {
    this.props.updateAnyUserState({ loading: true });
    try {
      const response = await fetch(
        `${BASE_BACKEND_URL}/api/credentials/?user_id=${this.state.selectedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({ data: data });
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    this.props.updateAnyUserState({ loading: false });
  };
  fetchUserData = () => {
    const { searchTerm } = this.state;

    this.setState({ loading: true });

    // Your API endpoint for fetching users based on institutionId and searchTerm
    const apiUrl = `${BASE_BACKEND_URL}/api/user/get_users/?user_id=${this.state.selectedUser.id}`;

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
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          documentFile: selectedFile,
          previewUrl: reader.result,
        });
      };

      reader.readAsDataURL(selectedFile);
    } else {
      // Reset the file input and show an error message
      event.target.value = null;
      alert("Please select a valid PDF file.");
    }
  };

  handlePreviewClick = () => {
    this.setState((prevState) => ({ showPreview: !prevState.showPreview }));
  };
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleUploadClick = async () => {
    this.props.updateAnyUserState({ loading: true });
    const { documentType, documentFile, year, selectedUser } = this.state;
    // Create form data
    const formData = new FormData();
    formData.append("document_type", documentType);
    formData.append("document_file", documentFile);
    formData.append("date", year);
    formData.append("user", selectedUser.id);
    formData.append("image_url", "no_file");
    try {
      // Make a POST request to the backend API
      const response = await fetch(`${BASE_BACKEND_URL}/api/credentials/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        // Handle successful response
        console.log("Upload successful");

        toast.success("Certificate Uploaded Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.setState({
          documentType: "",
          documentFile: null,
          previewUrl: "",
          showPreview: false,
          openCredentials: false,
        });
        this.fetchCredentials();
      } else {
        // Handle error response
        toast.error("Certificate Upload failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.props.updateAnyUserState({ loading: false });
      }
    } catch (error) {
      // Handle network error
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
    }
  };

  render() {
    const {
      documentFile,
      previewUrl,
      showPreview,
      open,
      options,
      loading,
      searchTerm,
      openCredentials,
      isModalOpen,
      selectedItems,
      email,
      emailError,
    } = this.state;

    const isStudent = this.props.user.groups.some(
      (userGroup) => 4 == userGroup.id
    );
    const isRegistrarorAdmin = this.props.user.groups.some(
      (userGroup) => 2 == userGroup.id || 3 == userGroup.id
    );

    return (
      <MainCard className="card" style={{ minHeight: "85vh" }}>
        <Modal
          open={openCredentials}
          onClose={this.handleCloseCredentials}
          fullWidth
        >
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
              overflowY: "auto", //
              overflowX: "hidden",
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={this.handleCloseCredentials}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <CloseIcon />
            </IconButton>
            <div>
              <h1>Upload New Credentials</h1>
              <hr style={{ margin: "15px 0" }} />
              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={12}>
                  <FormControl sx={{ m: 0, width: 430 }}>
                   
                    <Autocomplete
                      id="user-dropdown"
                      options={options}
                      loading={loading}
                      open={open}
                      onOpen={this.handleOpen}
                      onClose={this.handleClose}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(option) => option.username}
                      onChange={this.handleUserChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select User"
                          variant="outlined"
                          onChange={(e) =>
                            this.handleInputChangeSearch(
                              e,
                              params.inputProps.value
                            )
                          }
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {loading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid> */}
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ m: 0, width: 430 }}>
                    <InputLabel id="documentType">Document Type</InputLabel>
                    <Select
                      labelId="documentType"
                      id="documentType"
                      name="documentType"
                      value={this.state.documentType}
                      label="Document Type"
                      onChange={this.handleInputChange}
                      style={{ minWidth: "300px" }}
                    >
                      {categories.map((category) => (
                        <MenuItem
                          key={category.CategoryId}
                          value={category.CategoryId}
                        >
                          {category["NCRF short category"]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ m: 0, width: 430 }}>
                  <input
                    accept="application/pdf"
                    id="documentFile"
                    type="file"
                    onChange={this.handleFileUpload}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  {documentFile && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handlePreviewClick}
                      style={{ marginLeft: "10px" }}
                    >
                      {showPreview ? <IconX /> : <IconEye />}
                    </Button>
                  )}
                </Grid>
                {showPreview && previewUrl && (
                  <Grid item xs={12}>
                    <embed
                      src={previewUrl}
                      type="application/pdf"
                      width="100%"
                      height="600px"
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="date"
                      label="Date"
                      variant="outlined"
                      name="year"
                      // openTo="year"
                      // views={["year", "month"]}
                      value={dayjs(this.state.year)}
                      onChange={(newValue) =>
                        this.setState({ year: dayjs(newValue).format("YYYY") })
                      }
                      sx={{ m: 0, width: 430 }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "rgb(11, 41, 72)" }}
                    onClick={this.handleUploadClick}
                  >
                    Upload Credentials
                  </Button>
                </Grid>
              </Grid>
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
          <h1>Credentials</h1>
          {/* Button to open the user creation modal */}
          {isRegistrarorAdmin && (
            <Button
              // sx={{ m: 2 }}
              variant="contained"
              onClick={this.handleOpenCredentials}
            >
              <IconSquareRoundedPlus /> Upload New Credentials
            </Button>
          )}
          {/* {isStudent && (
            <Button variant="contained" onClick={this.handleOpenModal}>
              Share Credentials
            </Button>
          )} */}
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MainCard
              className="card"
              style={{ height: "75vh", overflowY: "scroll" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0",
                }}
              >
                <Avatar
                  alt={
                    options.length !== 0
                      ? `${options[0].first_name.charAt(0).toUpperCase()}`
                      : null
                  }
                  src={
                    options.length !== 0
                      ? `data:image/jpeg;base64,${options[0].profile_image}`
                      : null
                  }
                  // src={`data:image/jpeg;base64,${user.profile_image}`}
                  sx={{ width: 40, height: 40, marginRight: 2 }}
                />

                {/* Welcome Message and user.username */}
                <div>
                  <Typography
                    variant="h3"
                    gutterBottom
                    // style={{ color: "#FFFFFF" }}
                  >
                    {options.length !== 0
                      ? options[0].first_name.charAt(0).toUpperCase() +
                        options[0].first_name.slice(1) +
                        " " +
                        options[0].last_name.charAt(0).toUpperCase() +
                        options[0].last_name.slice(1)
                      : null}
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
                  <Typography variant="body1" textAlign="right">
                    {options.length !== 0 ? options[0].email : null}
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
                      {options.length !== 0 ? 
    (this.props.user.institution_country_name === "India" ?
        options[0].aadhar_card_id
            .split("")
            .map((char, index) => (index > 0 && index % 4 === 0 ? " " : "") + char)
        : options[0].aadhar_card_id.replace(/-/g, '').replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3')
    )
    : null
}
{" "}
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
                      <br /> {options.length !== 0 ? options[0].id : null}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              <hr />
              <Grid container alignItems="center" spacing={2}>
                {/* Left side: Email icon */}
                <Grid item xs={4}>
                  <p>First Name</p>
                </Grid>
                {/* Right side: Email ID */}
                <Grid item xs={8}>
                  <Typography variant="body1" textAlign="right">
                    {options.length !== 0 ? options[0].first_name : null}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={2}>
                {/* Left side: Email icon */}
                <Grid item xs={4}>
                  <p>Last Name</p>
                </Grid>
                {/* Right side: Email ID */}
                <Grid item xs={8}>
                  <Typography variant="body1" textAlign="right">
                    {options.length !== 0 ? options[0].last_name : null}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={2}>
                {/* Left side: Email icon */}
                <Grid item xs={4}>
                  <p>User Name</p>
                </Grid>
                {/* Right side: Email ID */}
                <Grid item xs={8}>
                  <Typography variant="body1" textAlign="right">
                    {options.length !== 0 ? options[0].username : null}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container alignItems="center" spacing={2}>
                {/* Left side: Email icon */}
                <Grid item xs={4}>
                  <p>Institution</p>
                </Grid>
                {/* Right side: Email ID */}
                <Grid item xs={8}>
                  <Typography variant="body1" textAlign="right">
                    {this.props.user.institution_name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={2}>
                {/* Left side: Email icon */}
                <Grid item xs={4}>
                  <p>State</p>
                </Grid>
                {/* Right side: Email ID */}
                <Grid item xs={8}>
                  <Typography variant="body1" textAlign="right">
                    {this.props.user.institution_location}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={2}>
                {/* Left side: Email icon */}
                <Grid item xs={4}>
                  <p>Country</p>
                </Grid>
                {/* Right side: Email ID */}
                <Grid item xs={8}>
                  <Typography variant="body1" textAlign="right">
                    {this.props.user.institution_country_name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={2}>
                {/* Left side: Email icon */}
                <Grid item xs={4}>
                  <p>Year</p>
                </Grid>
                {/* Right side: Email ID */}
                <Grid item xs={8}>
                  <Typography variant="body1" textAlign="right">
                    2024
                  </Typography>
                </Grid>
              </Grid>
              <hr />
            </MainCard>
          </Grid>
          <Grid item xs={6}>
            <MainCard
              className="card"
              style={{
                height: "75vh",
                overflowY: "scroll",
                backgroundColor: "#eaf0fe",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "left",
                  marginTop: "20px",
                  textAlign: "justify",
                }}
                container
                direction="column"
                alignItems="left"
                justify="right"
                spacing={2}
              >
                {this.state.data.map((item) => (
                  <Grid item key={item.id}>
                    <div style={{ position: "relative" }}>
                      {isStudent && (
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onChange={() => this.handleCheckboxChange(item.id)}
                          style={{
                            position: "absolute",
                            top: "105px",
                            left: 0,
                          }}
                        />
                      )}
                      <MainCard
                        className="card"
                        key={item.id}
                        style={{
                          width: "380px",
                          boxShadow: "rgb(0 0 0 / 2%) 5px 2px 16px 0px",
                        }}
                      >
                        <div class="well well-white mini-profile-widget">
                          <div class="image-container">
                            {" "}
                            <img
                              src={`data:image/jpeg;base64,${item.image_base64}`}
                              alt={item.cert_image}
                              class="avatar img-responsive"
                              style={{ width: "300px" }}
                            />
                            {/* <object
                        data={item.image_url}
                        type="application/pdf"
                        // width="200px"
                        height="200px"
                      >
                        <p>
                          It appears you don't have a PDF plugin for this
                          browser. No worries, you can{" "}
                          <a href={item.image_url}>
                            click here to download the PDF file.
                          </a>
                        </p>
                      </object> */}
                          </div>
                          <br />
                          <div class="details">
                            <Typography
                              variant="h3"
                              component="div"
                              color="textSecondary"
                              mb={3}
                              style={{ color: "black" }}
                            >
                              {item.Diploma}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between", // This will push the text to the ends
                                alignItems: "center", // This will align items vertically
                                paddingBottom: "12px",
                              }}
                            >
                              <b>NCRF Credit Level:</b>{" "}
                              <span style={{ textAlign: "right" }}>
                                {item.NCRF_credit_level}
                              </span>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between", // This will push the text to the ends
                                alignItems: "center", // This will align items vertically
                                paddingBottom: "12px",
                              }}
                            >
                              <b>Program Duration:</b>{" "}
                              <span style={{ textAlign: "right" }}>
                                {item.Program_duration}
                              </span>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between", // This will push the text to the ends
                                alignItems: "center", // This will align items vertically
                                paddingBottom: "12px",
                              }}
                            >
                              <b>Semesters:</b>{" "}
                              <span style={{ textAlign: "right" }}>
                                {item.Semesters}
                              </span>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              align="left"
                              sx={{
                                paddingBottom: "12px",
                              }}
                              // sx={{
                              //   display: "flex",
                              //   justifyContent: "space-between", // This will push the text to the ends
                              //   alignItems: "center", // This will align items vertically
                              //   paddingBottom: "12px",
                              // }}
                            >
                              <b>Description:</b> {item.cert_desc}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between", // This will push the text to the ends
                                alignItems: "center", // This will align items vertically
                                paddingBottom: "12px",
                              }}
                            >
                              <b>Credit Points:</b>{" "}
                              <span style={{ textAlign: "right" }}>
                                {item.credit_points}
                              </span>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between", // This will push the text to the ends
                                alignItems: "center", // This will align items vertically
                                paddingBottom: "12px",
                              }}
                            >
                              <b>Credits Per Year:</b>{" "}
                              <span style={{ textAlign: "right" }}>
                                {item.credits_per_year}
                              </span>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between", // This will push the text to the ends
                                alignItems: "center", // This will align items vertically
                                paddingBottom: "12px",
                              }}
                            >
                              <b>Hours:</b>{" "}
                              <span style={{ textAlign: "right" }}>
                                {item.hours}
                              </span>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between", // This will push the text to the ends
                                alignItems: "center", // This will align items vertically
                                paddingBottom: "12px",
                              }}
                            >
                              <b>Date:</b>{" "}
                              <span style={{ textAlign: "right" }}>
                                {item.date}
                              </span>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                display: "flex",
                                justifyContent: "space-between", // This will push the text to the ends
                                alignItems: "center", // This will align items vertically
                                paddingBottom: "12px",
                              }}
                            >
                              <b>Time:</b>{" "}
                              <span style={{ textAlign: "right" }}>
                                {new Date(item.created_at).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </span>
                            </Typography>
                            {item.image_url && (
                              <CardActions>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() =>
                                    this.handleViewClick(item.image_url)
                                  }
                                  align="center"
                                  style={{
                                    backgroundColor: "#ff6100",
                                    color: "#FFFFFF",
                                    width: "100%",
                                    border: "0",
                                  }}
                                >
                                  Download
                                </Button>
                              </CardActions>
                            )}
                          </div>
                        </div>
                      </MainCard>
                    </div>
                  </Grid>
                ))}
              </div>
            </MainCard>
          </Grid>
        </Grid>

        {isStudent && this.state.data.length !== 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              // alignItems: "right",
              marginTop: "20px",
            }}
          >
            <div style={{ marginRight: "10px" }}>
              {/* //style={{ flex: 1 }} */}
              <TextField
                label="Email"
                type="text"
                value={email}
                onChange={(e) => {
                  const { value } = e.target;
                  this.setState({ email: value });
                  this.validateEmail(value); // Validate email on change
                }}
                error={!!emailError}
                helperText={emailError}
              />
            </div>
            <div style={{ marginLeft: "10px", marginTop: "8px" }}>
              {" "}
              {/* Adjust margin between TextField and Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSend}
                disabled={this.isSendButtonDisabled()}
              >
                Send
              </Button>
            </div>
          </div>
        )}
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  institution_id: state.user.institution_id,
  user: state.user,
});

const mapDispatchToProps = { updateAnyUserState };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadStudentCredsNew);
