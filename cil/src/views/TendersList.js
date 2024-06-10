import React, { Component } from 'react';
import { Typography, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { IconEye } from "@tabler/icons";
class UploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
    };
  }

  componentDidMount() {
    const uploads = JSON.parse(localStorage.getItem('uploads')) || [];
    this.setState({ uploads });
  }

  render() {
    const { uploads } = this.state;

    return (
      <div>
        <Paper style={{ marginTop: '2rem', padding: '1rem' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Tendor List
        </Typography>
        {uploads.length === 0 ? (
          <Typography variant="subtitle1">No uploads available.</Typography>
        ) : (
          <TableContainer component={Paper} style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderRadius: '15px 0 0 0' }}>Name</TableCell>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white' }}>Created At</TableCell>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderRadius: '0 15px 0 0' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploads.map((upload) => (
                  <TableRow key={upload.id}>
                    <TableCell>{upload.name}</TableCell>
                    <TableCell>{new Date(upload.id).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          localStorage.setItem('uniqueid', upload.id);
                          window.location.href = `/tender`;
                        }}
                        style={{ border:'none', color: 'white', background: '#ff6400'}}
                      >
                        <IconEye style={{ marginRight: '0.5rem' }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}
          </Paper>
      </div>
    );
  }
}

export default UploadList;
