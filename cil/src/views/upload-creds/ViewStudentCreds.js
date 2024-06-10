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
import "./ViewCred.css";
import { IconCreditCard } from "@tabler/icons";
class ViewStudentCreds extends Component {
  handleViewClick = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };
  render() {
    return (
      <MainCard className="card" style={{ minHeight: "85vh" }}>
        <h1>
          Viewing{" "}
          {this.props.user.student_name.charAt(0).toUpperCase() +
            this.props.user.student_name.slice(1)}
          {"'s "}
          Credentials
        </h1>

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
          {this.props.credential_data.map((item) => (
            <Grid item key={item.token_id}>
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
                      <span style={{ textAlign: "right" }}>{item.hours}</span>
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
                      <span style={{ textAlign: "right" }}>{item.date}</span>
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
                        {new Date(item.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </Typography>
                    {item.image_url && (
                      <CardActions>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => this.handleViewClick(item.image_url)}
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
            </Grid>
          ))}
        </div>
      </MainCard>
    );
  }
}
const mapStateToProps = (state) => ({
  redux_loading: state.user.loading,
  credential_data: state.user.credential_data,
  user: state.user,
});
const mapDispatchToProps = { updateAnyUserState };

export default connect(mapStateToProps, mapDispatchToProps)(ViewStudentCreds);
