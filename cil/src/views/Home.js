import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Modal, Backdrop, Fade, TextField } from '@mui/material';
import Frame1 from './f1.png';
import Frame2 from './f2.png';
import Frame3 from './f3.png';
import Frame4 from './f4.png';
import { IconFileUpload } from "@tabler/icons";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { updateAnyUserState, loginUser } from "../store/actions/userActions";
import { connect } from "react-redux";
import { height } from '@mui/system';
import { toast } from "react-toastify";
const styles = {
  root: {
    height: '100vh',
    backgroundColor: '#f9f9f9',
    paddingTop: '20px',
  },
  appBar: {
    backgroundColor: '#111c3a',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  logo: {
    height: '50px',
  },
  button: {
    borderRadius: '20px',
    marginLeft: '10px',
  },
  content: {
    marginTop: '50px',
    textAlign: 'left',
  },
  header: {
    color: '#ff6b00',
    lineHeight: '1.5',
  },
  subHeader: {
    color: '#000',
    fontWeight: 'bold',
    lineHeight: '1.5',
  },
  paragraph: {
    marginTop: '20px',
    color: '#6d6d6d',
    lineHeight: '1.5',
  },
  uploadButton: {
    backgroundColor: '#ff6b00',
    color: '#fff',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: '#ff8c00',
    },
    borderRadius: '25px',
    width: '170px'
  },
  imageGrid: {
    marginTop: '30px',
  },
  image: {
    width: '100%',
    borderRadius: '25px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '600px',
    textAlign: 'center',
  },
  modalButton: {
    marginTop: '20px',
    backgroundColor:'rgb(255, 107, 0)'
  }
};


class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      selectedFile: null,
    };
  }

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  handleFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleUpload = async () => {
    const { selectedFile } = this.state;
    const name = 'Tender'
  if (!selectedFile) {
    alert("Please select a file and enter a name first.");
    return;
  }
    // alert(`${process.env.REACT_APP_ACCESS_KEY}`);
    console.log(' - - - -')
    console.log(process.env)
    this.props.updateAnyUserState({ loading: true });
  const s3Client = new S3Client({
    region: 'ap-south-1', // Replace with your region
    credentials: {
      accessKeyId: `${process.env.REACT_APP_ACCESS_KEY}`, // Replace with your access key
      secretAccessKey: `${process.env.REACT_APP_SECRET_KEY}`, // Replace with your secret key
    },
  });

  const uniqueId = Date.now(); // Replace with your unique ID generation logic
  const params = {
    Bucket: 'amplify-d1ocwsojuzradc-main--amplifybucket4830c827-hmba681dhosm', // Replace with your bucket name
    Key: `uploaded/${uniqueId}/tender/${selectedFile.name}`,
    Body: selectedFile,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    
    // Save data to localStorage
    const uploads = JSON.parse(localStorage.getItem('uploads')) || [];
    uploads.push({ id: uniqueId, name });
    localStorage.setItem('uploads', JSON.stringify(uploads));
    
    // alert('File uploaded successfully!');
    console.log(data)
    localStorage.setItem('uniqueid', uniqueId);
    toast.success("Tender Uploaded Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    window.location.href = `/tender`;
    
    this.handleCloseModal();
    
  } catch (err) {
    console.error('Error uploading file:', err);
    alert('File upload failed.');
    this.props.updateAnyUserState({ loading: false });
    toast.error("Tender Uploaded Failed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
  }
};
handleNameChange = (event) => {
  this.setState({ name: event.target.value });
};

  render() {
    
    return (
      <Box style={styles.root}>
        <Container>
          <Grid container spacing={3} alignItems="center" justifyContent="center" style={styles.content}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h1" component="h1" style={styles.header}>
                  <span>Upload </span>
                  <span style={styles.subHeader}>Documents</span>
                </Typography>
                <Typography variant="body1" component="p" style={styles.paragraph}>
                  Please upload the documents in ZIP format.
                </Typography>
                <Button variant="contained" style={styles.uploadButton} onClick={this.handleOpenModal}>
                  <IconFileUpload style={{ marginRight: '0.5rem' }} />Upload File
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} style={styles.imageGrid}>
                <Grid item xs={6}>
                  <Box style={{ width: '100%', height: '260px', borderRadius: '25px', boxShadow: '15px 14px 20px 0 #00000057' }}>
                    <img src={Frame1} alt="yoonify" style={{ width: '100%', height: '260px', borderRadius: '25px' }} />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box style={{ width: '100%', height: '260px', borderRadius: '25px', marginTop: '40px', boxShadow: '15px 14px 20px 0 #00000057' }} >
                    <img src={Frame2} alt="yoonify" style={{ width: '100%', height: '260px', borderRadius: '25px' }} />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box style={{ width: '100%', height: '260px', borderRadius: '25px', marginTop: '-25px', boxShadow: '15px 14px 20px 0 #00000057' }} >
                    <img src={Frame3} alt="yoonify" style={{ width: '100%', height: '260px', borderRadius: '25px' }} />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box style={{ width: '100%', height: '260px', borderRadius: '25px', marginTop: '10px', boxShadow: '15px 14px 20px 0 #00000057' }} >
                    <img src={Frame4} alt="yoonify" style={{ width: '100%', height: '260px', borderRadius: '25px' }} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <Modal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          closeAfterTransition
          // BackdropComponent={Backdrop}
          // BackdropProps={{
          //   timeout: 500,
          // }}
          style={styles.modal}
        >
          <Fade in={this.state.modalOpen}>
            <Box style={styles.modalContent}>
              <Typography variant="h1" component="h2">
                <span style={styles.header}>Upload</span> Tender
              </Typography>
              {/* <TextField
                type="text"
                label="Name"
                onChange={this.handleNameChange}
                fullWidth
                style={{ marginTop: '20px' }}
              /> */}
              <TextField
                type="file"
                onChange={this.handleFileChange}
                fullWidth
                style={{ marginTop: '20px' }}
              />
              <Button
                variant="contained"
                onClick={this.handleUpload}
                style={styles.modalButton}
              >
                Submit
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Box>
    );
  }
}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  updateAnyUserState,
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadScreen);
