import React, { Component } from "react";
import MainCard from "ui-component/cards/MainCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
} from "@mui/material";
import { connect } from "react-redux";
import Modal from "react-modal";
import { BASE_BACKEND_URL } from "../../store/constant";
import { Document, Page } from "react-pdf";
import { updateAnyUserState } from "../../store/actions/userActions";
import ShareCredModal from "./ShareCredModal";
import "./ViewCred.css";
class ViewCredentials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      data: [],
      selectedFile: null,
      pageNumber: 1,
      numPages: null,
    };
  }

  componentDidMount() {
    this.fetchData();
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

  fetchData = async () => {
    this.props.updateAnyUserState({ loading: true });
    try {
      const response = await fetch(`${BASE_BACKEND_URL}/api/credentials/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

  handleViewClick = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  render() {
    const { isModalOpen } = this.state;

    return (
      <MainCard className="card" style={{ minHeight: "85vh" }}>
        <h1>View Credentials</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleOpenModal}
        >
          Share Credentials
        </Button>
        {isModalOpen && (
          <ShareCredModal data={this.state.data} onClose={this.closeModal} />
        )}

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
            <Grid item key={item.token_id}>
              <MainCard
                className="card"
                key={item.token_id}
                style={{
                  width: "350px",
                  boxShadow: "rgb(0 0 0 / 2%) 5px 2px 16px 0px",
                }}
              >
                <div class="well well-white mini-profile-widget">
                  <div class="image-container">
                    {" "}
                    <img
                      src={item.image_url}
                      alt={item.image_url}
                      class="avatar img-responsive"
                    />
                  </div>
                  <br />
                  <div class="details">
                    <Typography
                      variant="h3"
                      component="div"
                      color="textSecondary"
                      mb={3}
                    >
                      {item.Diploma}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      <b>NCRF Credit Level:</b> {item.NCRF_credit_level}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      Program Duration: {item.Program_duration}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      <b>Semesters:</b> {item.Semesters}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      <b>Description:</b> {item.cert_desc}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      <b></b>Credit Points: {item.credit_points}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      <b>Credits Per Year:</b> {item.credits_per_year}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      <b>Hours:</b> {item.hours}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="left"
                    >
                      <b>Date:</b> {item.date}
                    </Typography>
                    {item.cert_image && (
                      <CardActions>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => this.handleViewClick(item.cert_image)}
                          align="center"
                        >
                          View File
                        </Button>
                      </CardActions>
                    )}
                  </div>
                </div>
              </MainCard>
            </Grid>
          ))}
        </div>
      </MainCard>
    );
  }
}
const mapStateToProps = (state) => ({
  redux_loading: state.user.loading,
});
const mapDispatchToProps = { updateAnyUserState };

export default connect(mapStateToProps, mapDispatchToProps)(ViewCredentials);
