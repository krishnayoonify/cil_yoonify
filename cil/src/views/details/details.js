// Content.jsx
import React from 'react';
import {
   Tabs, Tab,
  Typography,
  Button,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Modal, Backdrop, Fade,Box,TextField,
} from '@mui/material';
import { UploadFile as UploadIcon } from '@mui/icons-material';
import Frame1 from './Frame 1000006231.png';
import Frame2 from './Frame 1000006247.png';
import Frame3 from './Frame 1000006250.png';
import Frame0 from './f4.png';
import Frame4 from './joakim-honkasalo-hyj_RRTzJjo-unsplash 1.png';
import { IconFileUpload } from "@tabler/icons";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useParams } from 'react-router-dom';
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
    width: '250px',
    marginRight:'0'
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
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // companyName: '',
      // criteria: '',
      item: {},
      uniqueid: localStorage.getItem('uniqueid'),//2aa84753-03f1-4bc0-aa61-a40ea82bdee2
      modalOpen: false,
      selectedFile: null,
      selectedTab: 0,
      selectedVendor: '',
    };
  }

  fetchData = () => {
    const { uniqueid } = this.state;
    fetch(`https://h3divge2he.execute-api.ap-south-1.amazonaws.com/api/getdata/${uniqueid}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ item: data.item });
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching tender data:', error);
      });
  };
  componentDidMount() {
    this.fetchData();
    this.intervalId = setInterval(this.fetchData, 5000);
  }
  componentWillUnmount() {
    // Clear the interval when the component is unmounted to prevent memory leaks
    clearInterval(this.intervalId);
  }

  handleVendorChange = (event) => {
    this.setState({ selectedVendor: event.target.value });
  };
  handleCompanyNameChange = (event) => {
    this.setState({ companyName: event.target.value });
  };

  handleCriteriaChange = (event) => {
    this.setState({ criteria: event.target.value });
  };
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
  if (!selectedFile) {
    alert("Please select a file and enter a name first.");
    return;
  }
    
  const s3Client = new S3Client({
    region: 'ap-south-1', // Replace with your region
    credentials: {
      accessKeyId: `${process.env.REACT_APP_ACCESS_KEY}`, // Replace with your access key
      secretAccessKey: `${process.env.REACT_APP_SECRET_KEY}`, // Replace with your secret key
    },
  });

  
  const params = {
    Bucket: 'amplify-d1ocwsojuzradc-main--amplifybucket4830c827-hmba681dhosm', // Replace with your bucket name
    Key: `uploaded/${this.state.uniqueid}/vendor/${selectedFile.name}`,
    Body: selectedFile,
  };
  
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    this.fetchData();
    this.handleCloseModal();
    
  } catch (err) {
    // console.error('Error uploading file:', err);
    // alert('File upload failed.');
    toast.error(err, {
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
handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };
  // renderTendor = (requirements) => (
  //   <TableContainer component={Paper} style={{ borderRadius: '15px', overflow: 'hidden', boxShadow:'15px 14px 20px 0 #00000057' }}>
  //     <Table>
  //       <TableHead>
  //         <TableRow>
  //           <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderRadius: '15px 0 0 0' }}>
  //             Criteria ID
  //           </TableCell>
  //           <TableCell sx={{ backgroundColor: '#0E1635', color: 'white' }}>Eligibility</TableCell>
  //           <TableCell sx={{ backgroundColor: '#0E1635', color: 'white' }}>Commercial</TableCell>
  //           <TableCell sx={{ backgroundColor: '#0E1635', color: 'white' }}>Technical</TableCell>
  //           <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderRadius: '0 15px 0 0' }}>Provenness</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {requirements?.eligibility.map((eligibilityCriteria) => {
  //           const eligibilityCriteriaIdParts = eligibilityCriteria.criteria_id.split('.');
  //           const commercialCriteria = requirements.commercial.find(
  //             (commercialCriteria) => commercialCriteria.criteria_id.split('.')[1] === eligibilityCriteriaIdParts[1]
  //           );
  //           const technicalCriteria = requirements.technical.find(
  //             (technicalCriteria) => technicalCriteria.criteria_id.split('.')[1] === eligibilityCriteriaIdParts[1]
  //           );
  //           const provennessCriteria = requirements.provenness.find(
  //             (provennessCriteria) => provennessCriteria.criteria_id.split('.')[1] === eligibilityCriteriaIdParts[1]
  //           );

  //           return (
  //             <TableRow key={eligibilityCriteria.criteria_id}>
  //               <TableCell>{eligibilityCriteriaIdParts[1]}</TableCell>
  //               <TableCell>{eligibilityCriteria.criteria_description}</TableCell>
  //               <TableCell>{commercialCriteria ? commercialCriteria.criteria_description : '-'}</TableCell>
  //               <TableCell>{technicalCriteria ? technicalCriteria.criteria_description : '-'}</TableCell>
  //               <TableCell>{provennessCriteria ? provennessCriteria.criteria_description : '-'}</TableCell>
  //             </TableRow>
  //           );
  //         })}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // );
  // renderVendorTable = (item) => (
  //   <>
  //     <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
  //       <InputLabel id="vendor-select-label">Vendor Name</InputLabel>
  //       <Select
  //         labelId="vendor-select-label"
  //         id="vendor-select"
  //         value={this.state.selectedVendor}
  //         onChange={this.handleVendorChange}
  //         label="Vendor Name"
  //       >
  //         {item.vendors.map((vendor, index) => (
  //           <MenuItem key={index} value={vendor?.vendor_name}>
  //             {vendor?.vendor_name}
  //           </MenuItem>
  //         ))}
  //       </Select>
  //     </FormControl>
  //     <TableContainer component={Paper} style={{ borderRadius: '15px', overflow: 'hidden', boxShadow:'15px 14px 20px 0 #00000057' }}>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderRadius: '15px 0 0 0' }}>Tender Number</TableCell>
  //             <TableCell sx={{ backgroundColor: '#0E1635', color: 'white' }}>Vendor Name</TableCell>
  //             <TableCell sx={{ backgroundColor: '#0E1635', color: 'white' }}>Criteria ID</TableCell>
  //             <TableCell sx={{ backgroundColor: '#0E1635', color: 'white' }}>Criteria Description</TableCell>
  //             <TableCell sx={{ backgroundColor: '#0E1635', color: 'white' }}>Response</TableCell>
  //             <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderRadius: '0 15px 0 0' }}>Evaluation Results</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {item.vendors
  //             .filter((vendor) => this.state.selectedVendor === '' || vendor?.vendor_name === this.state.selectedVendor)
  //             .flatMap((vendor, index) =>
  //               vendor?.responses?.eligibility?.map((response, responseIndex) => {
  //                 const criteria = item.tender_info.requirements.eligibility.find((c) => c.criteria_id === response.criteria_id);
  //                 return (
  //                   <TableRow key={`${index}-${responseIndex}`} style={{ borderBottom: '1px solid #000' }}>
  //                     <TableCell>{item && item.tender_info && item.tender_info.tender_number}</TableCell>
  //                     <TableCell>{vendor?.vendor_name}</TableCell>
  //                     <TableCell>{response.criteria_id}</TableCell>
  //                     <TableCell>{criteria?.criteria_description}</TableCell>
  //                     <TableCell>{response.response}</TableCell>
  //                     <TableCell>{response.result ? (
  //                       <span
  //                         style={{
  //                           display: 'inline-block',
  //                           padding: '2px 8px',
  //                           borderRadius: '5px',
  //                           backgroundColor: response.result === 'Met' ? 'green' : 'red',
  //                           color: 'white',
  //                         }}
  //                       >
  //                         {response.result}
  //                       </span>
  //                     ) : (
  //                       '-'
  //                     )}</TableCell>
  //                   </TableRow>
  //                 );
  //               })
  //             )}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   </>
  // );

   
  renderComparisionTable = (item) => (
    
    <>
       <TableContainer component={Paper} style={{ borderRadius: '15px', overflow: 'scroll', maxHeight: '700px', boxShadow: '15px 14px 20px 0 #00000057' }}>
      <Table stickyHeader>
        <TableHead>
            <TableRow>
              {item?.tender_info?.requirements && 
            <><TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Criteria</TableCell>
            <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Summary</TableCell></>}
            {item?.vendors?.map((vendor, index) => (
              <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }} key={index}>
                {vendor?.vendor_name} (Response)
              </TableCell>
            ))}
            {item?.vendors?.map((vendor, index) => (
              <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }} key={index}>
                {vendor?.vendor_name} (Evaluation)
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
            {item?.tender_summary && <TableRow>
              <TableCell ><b>Overall Summary</b></TableCell>
              <TableCell >{item?.tender_summary}</TableCell>
              {/* <TableCell >-</TableCell>
              <TableCell >-</TableCell>
              <TableCell >-</TableCell>
              <TableCell >-</TableCell> */}
            </TableRow>}
            {Object.keys(item?.tender_info?.requirements || {}).flatMap((category) =>
            
            item?.tender_info?.requirements[category]?.map((criteria, criteriaIndex) => {
              
              return (
                <TableRow key={`${category}-${criteriaIndex}`} style={{ borderBottom: '1px solid #000' }}>
                  <TableCell><b>{category.toUpperCase()} ({criteria?.criteria_id})</b></TableCell>
                  <TableCell>{criteria?.criteria_description}</TableCell>
                  {item?.vendors?.map((vendor, vendorIndex) => {
                    const response = vendor?.responses?.[category]?.find((r) => r.criteria_id === criteria?.criteria_id);

                    const formatResponse = (res) => {
                      if (typeof res === 'string') {
                        return res;
                      } else if (res && typeof res === 'object') {
                        return '-';//JSON.stringify(res, null, 2);
                      } else {
                        return '-';
                      }
                    };
                    
                    // const response = vendor?.responses?.[category]?.find((r) => r.criteria_id === criteria?.criteria_id);
                    return (
                      <TableCell key={`${vendor?.vendor_name}-${vendorIndex}-${category}`}>
                        {formatResponse(response?.response)}
                      </TableCell>
                    );
                  })}
                  {item?.vendors?.map((vendor, vendorIndex) => {
                    const evaluation = vendor?.responses?.[category]?.find((r) => r.criteria_id === criteria?.criteria_id);
                    return (
                      <TableCell key={`${vendor?.vendor_name}-${vendorIndex}-${category}-evaluation`}>
                        {evaluation?.result ? (
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: '5px',
                              backgroundColor: evaluation.result === 'MET' ? 'green' :
                         evaluation.result === 'PARTIALLY MET' ? 'orange' :
                         evaluation.result === 'NOT MET' ? 'red' :
                         evaluation.result === 'INSUFFICIENT INFO' ? 'gray' :
                         'transparent',
                              color: 'white',
                            }}
                          >
                            {evaluation.result} 
                          </span>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>


    {/* <TableContainer component={Paper} style={{ borderRadius: '15px', overflow: 'hidden', maxHeight: '700px',  boxShadow:'15px 14px 20px 0 #00000057' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Criteria ID</TableCell>
            <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Criteria Description</TableCell>
            {item.vendors?.map((vendor, index) => (
              <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }} key={index}>
                {vendor?.vendor_name} (Response)
              </TableCell>
            ))}
            {item.vendors?.map((vendor, index) => (
              <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }} key={index}>
                {vendor?.vendor_name} (Evaluation)
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {['eligibility', 'provenness', 'technical', 'commercial'].map((category) =>
            item.tender_info?.requirements[category]?.map((criteria, index) => (
              <TableRow key={index} style={{ borderBottom: '1px solid #000' }}>
                <TableCell>{criteria.criteria_id}</TableCell>
                <TableCell>{criteria.criteria_description}</TableCell>
                {item.vendors?.map((vendor) => {
                  const response = vendor?.responses?.[category]?.find((r) => r.criteria_id === criteria.criteria_id);
                  return <TableCell key={`${vendor?.vendor_name}${category}`}>{response?.response || '-'}</TableCell>;
                })}
                {item.vendors?.map((vendor) => {
                  const evaluation = vendor?.responses?.[category]?.find((r) => r.criteria_id === criteria.criteria_id);
                  return (
                    <TableCell key={`${vendor?.vendor_name}${category}evaluation`}>
                      {evaluation?.result ? (
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '5px',
                            backgroundColor: evaluation.result === 'Met' ? 'green' : 'red',
                            color: 'white',
                          }}
                        >
                          {evaluation.result}
                        </span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      </TableContainer> */}
    </>
  );
  render() {
    const { item } = this.state;
    const { selectedTab } = this.state;
    return (
      <div style={{ padding: '2rem', marginTop:'70px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper style={{ padding: '2rem' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <img src={Frame2} alt="crane1" style={{ width: '100%',  borderRadius: '25px'}} />
                    <Grid container spacing={2} style={{marginTop:'0px'}}>
                        <Grid item>
                        <img src={Frame2} alt="crane2" style={{ width: '120px', height: '80px', borderRadius: '8px', boxShadow:'15px 14px 20px 0 #00000057' }} />
                        </Grid>
                        <Grid item>
                        <img src={Frame4} alt="crane3" style={{ width: '120px', height: '80px', borderRadius: '8px', boxShadow:'15px 14px 20px 0 #00000057' }} />
                        </Grid>
                        <Grid item>
                        <img src={Frame3} alt="crane4" style={{ width: '120px', height: '80px', borderRadius: '8px', boxShadow:'15px 14px 20px 0 #00000057' }} />
                        </Grid>
                        <Grid item>
                        <img src={Frame1} alt="crane5" style={{ width: '120px', height: '80px', borderRadius: '8px', boxShadow:'15px 14px 20px 0 #00000057' }} />
                        </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="h1" gutterBottom >
                    {item && item.tender_info && item.tender_info?.tender_number}
                  </Typography>
                  
                  {/* <Typography variant="body2" gutterBottom style={{background: '#cdc5c55c',width: '146px', borderRadius: '35px',textAlign: 'center',padding: '10px', margin:'20px 0',  boxShadow:'5px 5px 5px 0 #00000057'}}>
                    {item && item.vendors && item.vendors.length} Bid Responses
                  </Typography> */}
                  
                  
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '2rem', height:'100%' }}>
              <Typography variant="h1" gutterBottom>
                Tender Details
              </Typography>
              <hr />
              {item && <>
                    <Grid container padding={1}>
                  {item.tender_info?.tender_date && <Grid item xs={6} mt={2}>
                    <Typography variant="body2" fontWeight='Bold'>Tender Date:</Typography>
                  </Grid>}
                  <Grid item xs={6} mt={2} style={{ textAlign: 'right' }}>
                    <Typography variant="h5">{item && item.tender_info && item.tender_info?.tender_date}</Typography>
                  </Grid>
                  {item && item.tender_info && item.tender_info?.tender_deposit && <Grid item xs={6} mt={2}>
                    <Typography variant="body2" fontWeight='Bold'>Tender Deposit:</Typography>
                  </Grid>}
                  <Grid item xs={6} mt={2} style={{ textAlign: 'right' }}>
                    <Typography variant="h5">{item && item.tender_info && item.tender_info?.tender_deposit}</Typography>
                  </Grid>
                  {item && item.tender_info && item.tender_info?.tender_value && <Grid item xs={6} mt={2}>
                    <Typography variant="body2" fontWeight='Bold'>Tender Value:</Typography>
                  </Grid>}
                      <Grid item xs={6} mt={2} style={{ textAlign: 'right' }}>
                        <Typography variant="h5">{item && item.tender_info && item.tender_info?.tender_value}</Typography>
                      </Grid>
                    </Grid>
                    
                    
                    
                  </>}
            </Paper>
          </Grid>
        </Grid>
        <div style={{ textAlign: 'right' }}>
        <Button variant="contained" style={styles.uploadButton} onClick={this.handleOpenModal} >
                    <IconFileUpload style={{ marginRight: '0.5rem' }} />Upload Responses
          </Button>
          </div>
        <Paper style={{ marginTop: '2rem', padding: '1rem' }}>
          {/* <Grid container spacing={2} justifyContent="left">
            <Grid item>
              <FormControl variant="outlined" style={{ minWidth: 200, margin:'15px' }}>
                <InputLabel>Company Name</InputLabel>
                <Select
                  value={this.state.companyName}
                  onChange={this.handleCompanyNameChange}
                  label="Company Name"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Company A">Company A</MenuItem>
                  <MenuItem value="Company B">Company B</MenuItem>
                  <MenuItem value="Company C">Company C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" style={{ minWidth: 200, margin:'15px' }}>
                <InputLabel>Criteria</InputLabel>
                <Select
                  value={this.state.criteria}
                  onChange={this.handleCriteriaChange}
                  label="Criteria"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Criteria 1">Criteria 1</MenuItem>
                  <MenuItem value="Criteria 2">Criteria 2</MenuItem>
                  <MenuItem value="Criteria 3">Criteria 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid> */}
          {item && item?.tender_info && (
            <>
              {this.renderComparisionTable(item)}
            {/* <Tabs value={selectedTab} onChange={this.handleTabChange} aria-label="criteria tabs">
              <Tab label="Tender Details" />
              <Tab label="Vendor Details" />
              <Tab label="Vendor Diff" />
            </Tabs>
            <Box sx={{ p: 3 }}>
               {selectedTab === 0 && this.renderTendor(item.tender_info.requirements)}
              {selectedTab === 1 && this.renderVendorTable(item)}
              {selectedTab === 2 && this.renderComparisionTable(item)} 
            </Box> */}
          </>
        )}
          
        </Paper>
        
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
                <span style={styles.header}>Upload</span> Response
              </Typography>
              
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
      </div>
    );
  }
}

export default Content;
