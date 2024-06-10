import React, { Component } from "react";
import {
  Modal,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_BACKEND_URL } from "../../store/constant";
class ShareCredModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      email: "",
      emailError: "",
      emailIsValid: false,
    };
  }

  validateEmail = () => {
    const { email } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      this.setState({ emailError: "Email is required", emailIsValid: false });
    } else if (!emailRegex.test(email)) {
      this.setState({
        emailError: "Invalid email format",
        emailIsValid: false,
      });
    } else {
      this.setState({ emailError: "", emailIsValid: true });
    }
  };
  handleViewClick = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };
  handleSelectAll = () => {
    const { selectedItems } = this.state;
    const { data } = this.props;

    if (selectedItems.length === data.length) {
      this.setState({ selectedItems: [] });
    } else {
      this.setState({ selectedItems: data.map((item) => item.id) });
    }
  };

  handleSelectItem = (tokenId) => {
    this.setState((prevState) => {
      const { selectedItems } = prevState;
      if (selectedItems.includes(tokenId)) {
        return { selectedItems: selectedItems.filter((id) => id !== tokenId) };
      } else {
        return { selectedItems: [...selectedItems, tokenId] };
      }
    });
  };
  isSendButtonDisabled = () => {
    const { selectedItems, email, emailIsValid } = this.state;
    return selectedItems.length === 0 || !email.trim() || !emailIsValid;
  };
  handleSend = () => {
    this.validateEmail();

    const { selectedItems, email, emailIsValid } = this.state;
    const { onClose } = this.props;

    if (selectedItems.length > 0 && emailIsValid) {
      // Call backend API with selectedItems and email
      // Example API call using fetch:
      fetch(`${BASE_BACKEND_URL}/api/credentials/student_credit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ selectedItems, email }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
          // Close the modal after successful API call
          onClose();
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          // Handle error if needed
        });
    }
  };

  render() {
    const { data, onClose } = this.props;
    const { selectedItems, email, emailError } = this.state;
    console.log(emailError);
    return (
      <Modal open={true} onClose={onClose}>
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "95vw",
            padding: "20px",
            maxHeight: "80vh", // Set max height for scrolling
            overflowY: "auto", //
            overflowX: "hidden",
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <CloseIcon />
          </IconButton>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.length === data.length}
                      onChange={this.handleSelectAll}
                    />
                    Select All
                  </TableCell>
                  <TableCell>Diploma</TableCell>
                  <TableCell>NCRF Credit Level</TableCell>
                  <TableCell>Program Duration</TableCell>
                  <TableCell>Semesters</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Certificate</TableCell>
                  <TableCell>Credit Points</TableCell>
                  <TableCell>credit per year</TableCell>
                  <TableCell>hours</TableCell>
                  <TableCell>date</TableCell>
                  <TableCell>File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => this.handleSelectItem(item.id)}
                      />
                    </TableCell>
                    <TableCell>{item.Diploma}</TableCell>
                    <TableCell>{item.NCRF_credit_level}</TableCell>
                    <TableCell>{item.Program_duration}</TableCell>
                    <TableCell>{item.Semesters}</TableCell>
                    <TableCell>{item.cert_desc}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.handleViewClick(item.cert_image)}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>{item.credit_points}</TableCell>
                    <TableCell>{item.credits_per_year}</TableCell>
                    <TableCell>{item.hours}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {item.image_url ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => this.handleViewClick(item.image_url)}
                        >
                          View
                        </Button>
                      ) : (
                        "No file"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ marginTop: "10px" }}>
            <TextField
              label="Email"
              type="text"
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
              onBlur={this.validateEmail} // Validate email on blur
              error={!!emailError}
              helperText={emailError}
            />
          </div>

          <div style={{ marginTop: "10px", textAlign: "right" }}>
            {/* Cancel button at the bottom */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
            {/* Send button at the bottom */}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSend}
              disabled={this.isSendButtonDisabled()}
            >
              Send
            </Button>
          </div>
        </Paper>
      </Modal>
    );
  }
}

export default ShareCredModal;
