import React, { Component } from 'react';
import { Box, TextField, Button, Link, Typography } from '@mui/material';
import loginImg from "./Rectangle9486.png";
import { updateAnyUserState, loginUser } from "../../store/actions/userActions";
import { connect } from "react-redux";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
    };
    this.handle_signin = this.handle_signin.bind(this);
  }
  handle_signin = (e, data) => {
    e.preventDefault();
    this.props.loginUser(data);
  };
  render() {
    const styles = {
      root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // background: loginImg, // Adjust the path to your background image
        backgroundImage: `url(${loginImg})`,
        backgroundSize: 'cover',
      },
      formContainer: {
        backgroundColor: 'rgb(0 0 0 / 0%)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        color: 'white',
        maxWidth: '400px',
        width: '100%',
      },
      textField: {
        marginBottom: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background color for input
        backdropFilter: 'blur(5px)', // Blur effect for input
        borderRadius: '5px',
      },
      textFieldFieldset: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background color for input
        backdropFilter: 'blur(5px)', // Blur effect for input
        borderRadius: '5px',
        borderColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent border color
      },
      textFieldInput: {
        color: 'white',
      },
      textFieldLabel: {
        color: 'white',
      },
      textFieldOutline: {
        borderColor: 'white',
      },
      button: {
        marginTop: '15px',
        backgroundColor: '#ff6b00',
        '&:hover': {
          backgroundColor: '#ff8c00',
        },
      },
      link: {
        color: '#ff6b00',
        '&:hover': {
          color: '#ff8c00',
        },
      },
      title: {
        color: 'white',
        textAlign: 'left',
        fontSize: '35px',
        marginBottom:'25px'
      },
    };

    return (
      <Box style={styles.root} >
        <form
          className="form"
          onSubmit={(e) => this.handle_signin(e, this.state)}
        >
          <Box style={styles.formContainer}>
            <Typography variant="h4" component="div" gutterBottom style={styles.title} >
              Coal India Limited
            </Typography>
            <p style={{textAlign: 'left'}}>User Name</p>
            <TextField
              // label="User Name"
              variant="outlined"
              fullWidth
              style={styles.textField}
              InputProps={{
                style: styles.textFieldInput,
              }}
              InputLabelProps={{
                style: styles.textFieldLabel,
              }}
            />
            <p style={{textAlign: 'left'}}>Password</p>
            <TextField
              // label="Password"
              type="password"
              variant="outlined"
              fullWidth
              style={styles.textField}
              InputProps={{
                style: styles.textFieldInput,
              }}
              InputLabelProps={{
                style: styles.textFieldLabel,
              }}
            />
            <Link href="#" variant="body2" style={styles.link}>
              Forgot Password?
            </Link>
            <Button
               type="submit"
              variant="contained"
              fullWidth
              style={styles.button}
            >
              Login
            </Button>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Not have an account? <Link href="#" style={styles.link}>Register Now</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  updateAnyUserState,
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
