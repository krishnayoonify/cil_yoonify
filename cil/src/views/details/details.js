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
  InputLabel,LinearProgress,
  Modal, Backdrop, Fade,Box,TextField,IconButton
} from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Info, Link as LinkIcon } from '@mui/icons-material';
import { UploadFile as UploadIcon } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Frame1 from './5.jpg';
import Frame2 from './1.jpg';

import Frame2N from './2. Office team is working.jpg';
import Frame3N from './3. AI Enabled system.png';
import Frame4N from './4. Dashboard.jpg';
import Frame3 from './Frame 1000006250.png';
import Frame0 from './f4.png';
import Frame4 from './joakim-honkasalo-hyj_RRTzJjo-unsplash 1.png';
import { IconFileUpload } from "@tabler/icons";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { updateAnyUserState, loginUser } from "../../store/actions/userActions";
import { connect } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import * as XLSX from 'xlsx';

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
    margin: '20px 0',
    backgroundColor:'rgb(255, 107, 0)'
  },
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    backgroundColor: 'white',
    boxShadow: 24,
    padding: '16px 32px 24px',
  },
  exportButton: {
    margin: '-20px 0 15px 0px',
    backgroundColor: 'rgb(255, 107, 0)',
    float:'right'
  },
};
// const exportToExcel = (data, filename, div_id) => {
//   const worksheet = XLSX.utils.json_to_sheet(data);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//   XLSX.writeFile(workbook, `${filename}.xlsx`);
// };
const exportToExcel = (lastVendor, filename, div_id) => {

    const input = document.getElementById(div_id);

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0); // Use JPEG format with higher quality
        const pdf = new jsPDF('p', 'mm', 'a4'); // Adjust page dimensions as per your requirement
        const imgWidth = 210; // A4 page width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 0;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.height;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdf.internal.pageSize.height;
        }

        pdf.save(`${filename}.pdf`);
      });
  };
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // companyName: '',
      // criteria: '',
      item: {},
      uniqueid: localStorage.getItem('uniqueid'),//2aa84753-03f1-4bc0-aa61-a40ea82bdee2//'d8204704-e24b-432a-a429-6f2e4838efe0',//'', //
      modalOpen: false,
      selectedFile: null,
      selectedTab: 0,
      selectedVendor: '',
      open: false,
      modalContent: '',
      modalURL: '',
      modalURLName:'',
      percentage: 100,
    };
  }

  fetchData = () => {
    const { uniqueid } = this.state;
    fetch(`https://h3divge2he.execute-api.ap-south-1.amazonaws.com/api/getdata/${uniqueid}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ item: data.item });
        // debugger;
        console.log(data);
        // data.item.vendors?.forEach((vendor) => {
        //   for (const criteriaId in vendor.responses) {
        //     vendor.responses[criteriaId].category_complete
        //     debugger;
        //   } 
        // });
        if (data.item.vendors && data.item.vendors.length > 0) {
          const lastVendor = data.item.vendors[data.item.vendors.length - 1];
          for (const criteriaId in lastVendor.responses) {
            const responses = lastVendor.responses;

            let trueCount = 0;
            let totalCount = 0;

            // Iterate over responses
            for (const criteriaId in responses) {
              totalCount++;
              if (responses[criteriaId].category_complete === true) {
                trueCount++;
              }
            }

            // Calculate percentage
            let percentage = 0;
            if (totalCount > 0) {
              percentage = (trueCount / totalCount) * 100;
            }
            this.setState({percentage:percentage})
          } 
          
        }
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
  handleOpen = (content, url, name) => {
    this.setState({ open: true, modalContent: content, modalURL: url, modalURLName:name });
  };

  handleClose = () => {
    this.setState({ open: false, modalContent: '', modalURL: '', modalURLName:'' });
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
  this.props.updateAnyUserState({ loading: true });
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
    toast.success("Response Uploaded Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
    this.props.updateAnyUserState({ loading: false });
};
handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

renderTenderTable = (item) => {
  const extractTableData = () => {
    const tableData = [];
    if (item?.tender_info?.tender_summary) {
      tableData.push({
        Criteria: "Overall Summary",
        "Sub Category": "",
        Summary: item.tender_info.tender_summary
      });
    }
    Object.keys(item?.tender_info?.requirements || {}).forEach((category) => {
      item.tender_info.requirements[category].forEach((criteria) => {
        tableData.push({
          Criteria: `${category.toUpperCase()} (${criteria.criteria_id})`,
          "Sub Category": criteria.criteria_subcategory,
          Summary: criteria.criteria_description
        });
      });
    });
    return tableData;
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => exportToExcel(extractTableData(), 'Tender Table', 'tender-table')}
        style={styles.exportButton}
      >
        Export to PDF
      </Button>
      <TableContainer component={Paper} style={{ borderRadius: '15px', overflow: 'scroll', boxShadow: '15px 14px 20px 0 #00000057', width: '100%',height: '100%', borderCollapse: 'collapse' }} id="tender-table">
      {/* //maxHeight: '700px', */}
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {item?.tender_info?.requirements &&
                <>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Criteria</TableCell>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Sub Category</TableCell>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Summary</TableCell>
                </>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {item?.tender_info?.tender_summary && <TableRow>
              <TableCell><b>Overall Summary</b></TableCell>
              <TableCell></TableCell>
              <TableCell>{item?.tender_info?.tender_summary}</TableCell>
            </TableRow>}
            {Object.keys(item?.tender_info?.requirements || {}).flatMap((category) =>
              item?.tender_info?.requirements[category]?.map((criteria, criteriaIndex) => (
                <TableRow key={`${category}-${criteriaIndex}`} style={{ borderBottom: '1px solid #000' }}>
                  <TableCell><b>{category.toUpperCase()} ({criteria?.criteria_id})</b></TableCell>
                  <TableCell>{criteria?.criteria_subcategory}</TableCell>
                  <TableCell>{criteria?.criteria_description}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
  renderComparisionTable = (item) => {
  const { open, modalContent, modalURL, modalURLName } = this.state;

  const extractTableData = () => {
    const tableData = [];
    Object.keys(item?.tender_info?.requirements || {}).forEach((category) => {
      item.tender_info.requirements[category].forEach((criteria) => {
        const row = {
          Criteria: `${category.toUpperCase()} (${criteria.criteria_id})`,
          "Sub Category": criteria.criteria_subcategory,
          Summary: criteria.criteria_description,
        };
        item.vendors?.forEach((vendor) => {
          for (const criteriaId in vendor.responses[category].data) {
            if (criteriaId === criteria.criteria_id) {
                const response = vendor.responses[category].data[criteriaId]
                row[`${vendor.vendor_name} (Response)`] = response?.response || '-';
                row[`${vendor.vendor_name} (Evaluation)`] = response?.result || '-';
              }
          } 
        });
        tableData.push(row);
      });
    });
    return tableData;
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => exportToExcel(extractTableData(), 'Comparision Table', 'comparision-table')}
        style={styles.exportButton}
      >
        Export to PDF
      </Button>
      <TableContainer component={Paper} style={{ borderRadius: '15px', overflow: 'scroll', boxShadow: '15px 14px 20px 0 #00000057', width: '100%',height: '100%', borderCollapse: 'collapse' }} id="comparision-table">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {item?.tender_info?.requirements &&
                <>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Criteria</TableCell>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Sub Category</TableCell>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Summary</TableCell>
                </>
              }
              {/* {item?.vendors?.map((vendor, index) => (
                <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }} key={index}>
                  {vendor?.vendor_name} (Response)
                </TableCell>
              ))} */}
              {item?.vendors?.map((vendor, index) => (
                <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }} key={index}>
                  {vendor?.vendor_name} (Evaluation)
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(item?.tender_info?.requirements || {}).flatMap((category) =>
              item?.tender_info?.requirements[category]?.map((criteria, criteriaIndex) => (
                <TableRow key={`${category}-${criteriaIndex}`} style={{ borderBottom: '1px solid #000' }}>
                  <TableCell><b>{category.toUpperCase()} ({criteria?.criteria_id})</b></TableCell>
                  <TableCell>{criteria?.criteria_subcategory}</TableCell>
                  <TableCell>{criteria?.criteria_description}</TableCell>
                  {/* {item?.vendors?.map((vendor, vendorIndex) => {
                    for (const criteriaId in vendor.responses[category].data) {
                      if (criteriaId === criteria.criteria_id) {
                        const response = vendor.responses[category].data[criteriaId];
                        const formatResponse = (res) => {
                            if (typeof res === 'string') {
                              return res;
                            } else if (res && typeof res === 'object') {
                              return '-';
                            } else {
                              return '-';
                            }
                          };
                          return (
                            <TableCell key={`${vendor?.vendor_name}-${vendorIndex}-${criteria.criteria_id}`}>
                              {formatResponse(response?.response)}
                              <span onClick={() => this.handleOpen(response?.related_content, response?.url, response?.file_name)} style={{padding:'0'}}>
                                <Info />
                              </span>
                            </TableCell>
                          );
                        }
                    }
                    // const response = vendor?.responses?.[category]?.find((r) => r.criteria_id === criteria?.criteria_id);
                    // const formatResponse = (res) => {
                    //   if (typeof res === 'string') {
                    //     return res;
                    //   } else if (res && typeof res === 'object') {
                    //     return '-';
                    //   } else {
                    //     return '-';
                    //   }
                    // };
                    // return (
                    //   <TableCell key={`${vendor?.vendor_name}-${vendorIndex}-${category}`}>
                    //     {formatResponse(response?.response)}
                    //     <IconButton onClick={() => this.handleOpen(response?.related_content, response?.url)}>
                    //       <Info />
                    //     </IconButton>
                    //   </TableCell>
                    // );
                  })} */}
                  {item?.vendors?.map((vendor, vendorIndex) => {
                    // const evaluation = vendor?.responses?.[category]?.find((r) => r.criteria_id === criteria?.criteria_id);
                    // return (
                    //   <TableCell key={`${vendor?.vendor_name}-${vendorIndex}-${category}-evaluation`}>
                    //     {evaluation?.result ? (
                    //       <span
                    //         style={{
                    //           display: 'flex',
                    //           alignItems: 'center',
                    //           justifyContent: 'center',
                    //           padding: '2px 8px',
                    //           borderRadius: '5px',
                    //           width: '120px',
                    //           height:'60px',
                    //           backgroundColor: evaluation.result === 'MET' ? 'green' :
                    //             evaluation.result === 'PARTIALLY MET' ? 'orange' :
                    //               evaluation.result === 'NOT MET' ? 'red' :
                    //                 evaluation.result === 'INSUFFICIENT INFO' ? 'gray' :
                    //                   'transparent',
                    //           color: 'white',
                    //         }}
                    //       >
                    //         {evaluation.result}
                    //       </span>
                    //     ) : (
                    //       '-'
                    //     )}
                    //   </TableCell>
                    // );
                    for (const criteriaId in vendor.responses[category].data) {
                      if (criteriaId === criteria.criteria_id) {
                        const evaluation = vendor.responses[category].data[criteriaId]
                        return (
                      <TableCell key={`${vendor?.vendor_name}-${vendorIndex}-${criteria.criteria_id}-evaluation`}>
                        {evaluation?.result ? (
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '2px 8px',
                              borderRadius: '5px',
                              width: '120px',
                              height:'60px',
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
                        }
                    }
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box style={styles.modalStyle}>
          <h2 id="simple-modal-title">Extracted from { modalURLName}</h2>
          <p id="simple-modal-description">{modalContent}</p>
          {modalURL && (
            <Button variant="contained" color="primary" href={modalURL} target="_blank" style={styles.modalButton}>
              <LinkIcon style={{marginRight:"10px" }}/> {modalURLName}
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};
  groupCriteria = (criteria) => {
  const grouped = [];
  if (criteria) {
    criteria.forEach((criterion) => {
      let group = grouped.find(g => g[0].criteria_subcategory === criterion.criteria_subcategory);
      if (!group) {
        group = [];
        grouped.push(group);
      }
      group.push(criterion);
    });
    }
  return grouped;
};

renderTechnicalTable = (item, req_parm) => {
  const { open, modalContent, modalURL, modalURLName } = this.state;
  const groupedCriteria = this.groupCriteria(item?.tender_info?.requirements[req_parm]);

  const extractTableData = () => {
    const tableData = [];
    groupedCriteria.forEach((group) => {
      group.forEach((criteria, criteriaIndex) => {
        const row = {
          Requirements: criteriaIndex === 0 ? criteria.criteria_subcategory : '',
          Summary: criteria.criteria_description,
        };
        item.vendors?.forEach((vendor) => {
          for (const criteriaId in vendor.responses[req_parm].data) {
            if (criteriaId === criteria.criteria_id) {
                const response = vendor.responses[req_parm].data[criteriaId]
                row[`${vendor.vendor_name} (Response)`] = response?.response || '-';
                row[`${vendor.vendor_name} (Evaluation)`] = response?.result || '-';
              }
          } 
          
          
        });
        tableData.push(row);
      });
    });
    return tableData;
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => exportToExcel(extractTableData(), req_parm.toUpperCase() + ' Details', req_parm.toUpperCase() + '-div')}
        style={styles.exportButton}
      >
        Export to PDF
      </Button>
      <TableContainer component={Paper} style={{ borderRadius: '15px', overflow: 'scroll', boxShadow: '15px 14px 20px 0 #00000057', width: '100%', height: '100%', borderCollapse: 'collapse' }} id={req_parm.toUpperCase() + '-div'}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {item?.tender_info?.requirements &&
                <>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Requirements</TableCell>
                  <TableCell sx={{ backgroundColor: '#0E1635', color: 'white', borderBottom: '2px solid #000', borderTop: '2px solid #000' }}>Summary</TableCell>
                </>
              }
              
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
            {groupedCriteria.flatMap((group, groupIndex) =>
              group.map((criteria, criteriaIndex) => (
                <TableRow key={`${criteria?.criteria_id}-${criteriaIndex}`} style={{ borderBottom: '1px solid #000' }}>
                  {criteriaIndex === 0 && (
                    <TableCell rowSpan={group.length} style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>
                      {criteria.criteria_subcategory}
                    </TableCell>
                  )}
                  <TableCell>{criteria.criteria_description}</TableCell>
                  {item?.vendors?.map((vendor, vendorIndex) => {                    
                    for (const criteriaId in vendor.responses[req_parm].data) {
                      if (criteriaId === criteria.criteria_id) {
                        const response = vendor.responses[req_parm].data[criteriaId];
                        const formatResponse = (res) => {
                            if (typeof res === 'string') {
                              return res;
                            } else if (res && typeof res === 'object') {
                              return '-';
                            } else {
                              return '-';
                            }
                          };
                          return (
                            <TableCell key={`${vendor?.vendor_name}-${vendorIndex}-${criteria.criteria_id}`}>
                              {formatResponse(response?.response)}
                              <IconButton onClick={() => this.handleOpen(response?.related_content, response?.url, response?.file_name)} style={{padding:'0'}}>
                                <Info  style={{padding:'0'}}/>
                              </IconButton>
                            </TableCell>
                          );
                        }
                    }
                    // const response = vendor?.responses?.[req_parm]?.find((r) => r.criteria_id === criteria?.criteria_id);
                    
                  })}
                  {item?.vendors?.map((vendor, vendorIndex) => {
                    // const evaluation = vendor?.responses?.[req_parm]?.find((r) => r.criteria_id === criteria?.criteria_id);
                    // const evaluation = '-'
                    for (const criteriaId in vendor.responses[req_parm].data) {
                      if (criteriaId === criteria.criteria_id) {
                        const evaluation = vendor.responses[req_parm].data[criteriaId]
                        return (
                      <TableCell key={`${vendor?.vendor_name}-${vendorIndex}-${criteria.criteria_id}-evaluation`}>
                        {evaluation?.result ? (
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '2px 8px',
                              borderRadius: '5px',
                              width: '120px',
                              height:'60px',
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
                        }
                    }
                    
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box style={styles.modalStyle}>
          <h2 id="simple-modal-title">Extracted from  { modalURLName}</h2>
          <p id="simple-modal-description">{modalContent}</p>
          {modalURL && (
            <Button variant="contained" color="primary" href={modalURL} target="_blank" style={styles.modalButton}>
              <LinkIcon style={{marginRight:"10px" }}/> {modalURLName }
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};

  render() {
    const { item } = this.state;
    const { selectedTab } = this.state;
    const hasTechnicalDetails = item?.tender_info?.requirements?.technical?.length > 0;
    const hasCommercialDetails = item?.tender_info?.requirements?.commercial?.length > 0;
    const hasEligibilityDetails = item?.tender_info?.requirements?.eligibility?.length > 0;
    const hasProvennessDetails = item?.tender_info?.requirements?.provenness?.length > 0;
    const hasSummaryData = hasTechnicalDetails || hasCommercialDetails || hasEligibilityDetails || hasProvennessDetails;

    const hasVendorData = item?.vendors?.some(vendor => 
      ['technical', 'commercial', 'eligibility', 'provenness'].some(category =>
            vendor?.responses?.[category]?.data
        )
    );

    const hasComparisonData = (hasTechnicalDetails || hasCommercialDetails || hasEligibilityDetails || hasProvennessDetails) && hasVendorData;
    return (
      <div style={{ padding: '2rem', marginTop:'70px' }}>
        <Grid container spacing={3}>
          
          <Grid item xs={12} md={8}>
            <Paper style={{ padding: '2rem' }}>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <img src={Frame2} alt="crane1" style={{ width: '94%',  borderRadius: '25px'}} />
                    <Grid container spacing={2} style={{marginTop:'0px'}}>
                        <Grid item>
                        <img src={Frame2} alt="crane2" style={{ width: '120px', height: '80px', borderRadius: '8px', boxShadow:'15px 14px 20px 0 #00000057' }} />
                        </Grid>
                        <Grid item>
                        <img src={Frame2N} alt="crane3" style={{ width: '120px', height: '80px', borderRadius: '8px', boxShadow:'15px 14px 20px 0 #00000057' }} />
                        </Grid>
                        <Grid item>
                        <img src={Frame4N} alt="crane5" style={{ width: '120px', height: '80px', borderRadius: '8px', boxShadow: '15px 14px 20px 0 #00000057' }} />
                        </Grid>
                        <Grid item>
                      
                      <img src={Frame3N} alt="crane4" style={{ width: '120px', height: '80px', borderRadius: '8px', boxShadow:'15px 14px 20px 0 #00000057' }} />
                        </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} md={6} style={{ position: 'relative' }}>
                  <Typography variant="h1" gutterBottom style={{ marginTop:'100px' }}>
                    {item && item.tender_info && item.tender_info?.tender_number}
                  </Typography>
                  {this.state.percentage != 100 ?
                  <div style={{position: 'absolute',
                      bottom: '-30px', // Adjust top position as needed
                      right: '10px', // Adjust right position as needed
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // marginTop:'60px',
                      padding: '10px', // Adjust this value for spacing
                      // background: 'rgba(255, 255, 255, 0.7)', // Adjust background color and opacity
                      borderRadius: '5px', // Adjust border radius if needed
                    }}>
                    <Box sx={{ width: '100px', mb: 1 }}>
                      <LinearProgress variant="determinate" value={this.state.percentage} />
                    </Box>
                    <h4 style={{maringTop:'5px', marginLeft:'10px'}}>
                      {this.state.percentage + '% complete'}
                    </h4>
                  </div>
                : !item?.tender_info?.complete ? <div style={{position: 'absolute',
                      bottom: '-60px', // Adjust top position as needed
                      right: '10px', // Adjust right position as needed
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // marginTop:'60px',
                      padding: '10px', // Adjust this value for spacing
                      // background: 'rgba(255, 255, 255, 0.7)', // Adjust background color and opacity
                      borderRadius: '5px', // Adjust border radius if needed
                    }}>
                    <InfinitySpin
                      width="200"
                      color="#07172E"
                      ariaLabel="loading"
                      wrapperStyle
                      wrapperClass
                    />
                      <Typography variant="h4" style={{ padding: '38px 0px' }}>"Processing Data..." </Typography>
                  </div>: <></> }
                  
                  
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
                  {item && item.tender_info && item.tender_info?.tender_value && <Grid item xs={6} mt={2}>
                    <Typography variant="body2" fontWeight='Bold'>Tender Value:</Typography>
                  </Grid>}
                      <Grid item xs={6} mt={2} style={{ textAlign: 'right' }}>
                        <Typography variant="h5">{item && item.tender_info && item.tender_info?.tender_value}</Typography>
                      </Grid>
                  {item && item.tender_info && item.tender_info?.tender_deposit && <Grid item xs={6} mt={2}>
                    <Typography variant="body2" fontWeight='Bold'>Tender Deposit:</Typography>
                  </Grid>}
                  <Grid item xs={6} mt={2} style={{ textAlign: 'right' }}>
                    <Typography variant="h5">{item && item.tender_info && item.tender_info?.tender_deposit}</Typography>
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
                <Tabs value={selectedTab} onChange={this.handleTabChange} aria-label="criteria tabs">
                
                {hasSummaryData && <Tab label="Tender Requirements" />}
                    {hasTechnicalDetails && <Tab label="Technical Details" />}
                    {hasCommercialDetails && <Tab label="Commercial Details" />}
                    {hasEligibilityDetails && <Tab label="Eligibility Details" />}
                    {hasProvennessDetails && <Tab label="Provenness Details" />}
                    {hasComparisonData && <Tab label="Comparison" />}
                </Tabs>
                <Box sx={{ p: 3 }}>                
                {selectedTab === 0 && hasSummaryData && this.renderTenderTable(item)}
                    {selectedTab === 1 && hasTechnicalDetails && this.renderTechnicalTable(item, 'technical')}
                    {selectedTab === 2 && hasCommercialDetails && this.renderTechnicalTable(item, 'commercial')}
                    {selectedTab === 3 && hasEligibilityDetails && this.renderTechnicalTable(item, 'eligibility')}
                    {selectedTab === 4 && hasProvennessDetails && this.renderTechnicalTable(item, 'provenness')}
                    {selectedTab === 5 && hasComparisonData && this.renderComparisionTable(item)}
                </Box>
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


const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  updateAnyUserState,
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);