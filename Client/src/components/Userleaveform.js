import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaTrash } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { MDBRadio } from 'mdb-react-ui-kit';
import "../styles.css"
import { Alert } from 'react-bootstrap';

function Userleaveform() {
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [modeOfLeave, setModeOfLeave] = useState('');
  const [responsibility, setResponsibility] = useState('');
  const [workResponsibility, setWorkResponsibility] = useState('');
  const [workAlteration, setWorkAlteration] = useState('');
  const [concatenatedValues, setConcatenatedValues] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [startingDateError, setStartingDateError] = useState('');
  const [endingDateError, setEndingDateError] = useState('');
  const [modeOfLeaveError, setModeOfLeaveError] = useState('');
  const [responsibilityError, setResponsibilityError] = useState('');;
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isStartingHalfDay, setIsStartingHalfDay] = useState(false);
  const [isEndingHalfDay, setIsEndingHalfDay] = useState(false);
  const [morninghalfday, setMorninghalfday] = useState(false);
  const [daysCount, setDaysCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);


  //date calculated function 

  const handleStartingDateChange = (e) => {
    const inputStartingDate = e.target.value;
    setStartingDate(inputStartingDate);
    calculateDaysCount(inputStartingDate, endingDate, isStartingHalfDay, isEndingHalfDay);
  };
  const handleEndingDateChange = (e) => {
    const inputEndingDate = e.target.value;
    setEndingDate(inputEndingDate);
    calculateDaysCount(startingDate, inputEndingDate, isStartingHalfDay, isEndingHalfDay);
  };

  const handleStartingHalfDayChange = (e) => {
    const isChecked = e.target.checked;
    setIsStartingHalfDay(isChecked);
    calculateDaysCount(startingDate, endingDate, isChecked, isEndingHalfDay);
  };

  const handleEndingHalfDayChange = (e) => {
    const isChecked = e.target.checked;
    setIsEndingHalfDay(isChecked);
    calculateDaysCount(startingDate, endingDate, isStartingHalfDay, isChecked);
  };

  const calculateDaysCount =  (startDate, endDate, isStartHalfDay, isEndHalfDay) => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    if (!isNaN(startDateTime) && !isNaN(endDateTime)) {
      // Set hours to 12:00 PM for half-day selection
      if (isStartHalfDay) startDateTime.setHours(12, 0, 0);
      if (isEndHalfDay) endDateTime.setHours(12, 0, 0);

      const timeDifference = endDateTime.getTime() - startDateTime.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
   setDaysCount(daysDifference);
   setShowAlert (daysDifference < 0 || daysDifference > 18);
    }
  };
  const handleWorkResponsibilityChange = (e) => {
    setWorkResponsibility(e.target.value);
  };

  const handleWorkAlterationChange = (e) => {

    setWorkAlteration(e.target.value);
  };

  const handleAddWorkResponsibility = () => {
    if (!workResponsibility || !workAlteration) {

      alert('Please enter the work responsibility (or) alteration');

      return;
    }
    const concatenatedValue = [workResponsibility, workAlteration];
    setConcatenatedValues([...concatenatedValues, concatenatedValue]);
    setWorkResponsibility('');
    setWorkAlteration('');

  };

  const handleRemoveResponsibility = (index) => {
    const updatedConcatenatedValues = [...concatenatedValues];
    updatedConcatenatedValues.splice(index, 1);
    setConcatenatedValues(updatedConcatenatedValues);

  };

  const handleModeOfLeaveChange = (e) => {
    setModeOfLeave(e.target.value);
    if (e.target.value === 'ML-MEDICAL LEAVE') {
      setFileSelected(true);
    } else {
      setFileSelected(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleButtonClick = (path) => {
    window.location.href = path;
    getData();
  };

  const getData = () => {
    const startingDate = 'startingDate';
    const endingDate = 'endingDate';
    const modeOfLeave = 'modeOfLeave';
    const file = 'file';
    const workResponsibility = 'workResponsibility';
    const workAlteration = 'workAlteration';

    return {
      startingDate,
      endingDate,
      modeOfLeave,
      file,
      workResponsibility,
      workAlteration,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (showAlert) { 
      daysCount < 0 ?  alert('Number of days leave cannot be negative'):
      alert('Number of days leave should be less than 18 days')
       return}

    const user_id = localStorage.getItem('user_id');
    const user_email = localStorage.getItem('user_email');
    const user_role = localStorage.getItem('user_role');
    console.log('Starting Date:', startingDate);
    console.log('Ending Date:', endingDate);
    console.log('Mode Of Leave:', modeOfLeave);
    console.log('Reponsibility:', responsibility);
    console.log('File:', file);
    console.log('Work Responsibility:', workResponsibility);
    console.log('Work Alteration:', workAlteration);
    console.log('Number of days:', daysCount);
    console.log('User_id:', user_id);
    console.log('emailid:', user_email);
    console.log('user_role:', user_role);

    let validForm = true;

    if (concatenatedValues.length < 1) {
      return alert("Work Alteration not added");
    }

    if (!startingDate || !endingDate) {
      setEndingDateError('Please select both start and end time.');
      validForm = false;
    } else if (endingDate.valueOf() < startingDate.valueOf()) {
      setEndingDateError('Start time should be less than end time.');
      validForm = false;
    } else {
      setStartingDateError('');
      setEndingDateError('');
    }

    if (!modeOfLeave) {
      setModeOfLeaveError('Please select the mode of leave.');
      validForm = false;
    } else {
      setModeOfLeaveError('');
    }

    if (modeOfLeave === 'ML-MEDICAL LEAVE' && !file) {
      setFileError('Please choose the medical file.');
      validForm = false;
    } else {
      setFileError('');
    }

    if (!responsibility) {
      setResponsibilityError('Please enter a responsibility.');
      validForm = false;
    } else {
      setResponsibilityError('');
    }

    if (validForm) {
      // Submit the form or perform further actions
      axios
        .post('/api/userinput', { startingDate, endingDate, daysCount, modeOfLeave, file, responsibility, workResponsibility, workAlteration: concatenatedValues, user_id, user_email, user_role })
        .then((response) => {
          alert('Form submitted successfully');
          window.location.href = '/dashboard';
        })
        .catch((error) => {
          console.error('Error saving user input:', error);
        });

    }
  };
  const mainStyles = {
    width: "100%",
    // height: "750px",
    maxWidth: "600px",
    background: "lightpink",
    overflow: "hidden",
    backgroundImage:
      'url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "10px",
    boxShadow: "5px 20px 50px #000",
    padding: "25px",
  };



  const signupStyles = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  const labelStyles = {
    color: "#fff",
    fontSize: "2.2em",
    justifyContent: "center",
    display: "flex",
    margin: "50px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.5s ease-in-out",
  };


  const inputStyles = {
    width: "65%",
    height: "40px",
    // background: "#e0dede",
    background: "#e0ffff	",
    justifyContent: "center",
    display: "flex",
    margin: "20px auto",
    padding: "10px",
    border: "none",
    outline: "none",
    borderRadius: "5px",
  };


  // const getFormStyle = () => {
  //   return {
  //     maxWidth: '600px',
  //     margin: '0 auto',
  //   };
  // };



  // const getDaysCount = () => {
    
  //   return 18; 
  // };



  return (

    <div className='mx-auto' style={mainStyles}>
      <div className="signup" style={signupStyles}>

        {/* Inside your component or template */}
        <div className="container mb-5 ">
          <h3 style={labelStyles}>Leave Application Form</h3>
          <br />
          <Form onSubmit={handleSubmit}
          // style={{ maxWidth: '600px', margin : '0 auto'}}
          >
            <Form.Group className="mb-5" controlId="startingDate">
              <Form.Label className="label-styles">Starting Date</Form.Label>
              <Form.Control style={inputStyles}
                type="date"
                value={startingDate}
                onChange={handleStartingDateChange}
                isInvalid={!!startingDateError}
              />
              <Form.Control.Feedback type="invalid">
                {startingDateError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-5" controlId="endingDate">
              <Form.Label className="label-styles">Ending Date</Form.Label>
              <Form.Control style={inputStyles}
                type="date"
                value={endingDate}
                onChange={handleEndingDateChange}
                isInvalid={!!endingDateError}
              />
              <Form.Control.Feedback type="invalid">
                {endingDateError}
              </Form.Control.Feedback>
            </Form.Group>




            <p>Number of days: {daysCount}</p>

            {showAlert && (
        <Alert variant="warning">

{daysCount < 0 ?  <span className='text-dark'> Number of days leave cannot be negative.</span> :    <span className='text-dark'> Days count is crossed 18 days. Please contact the admin.</span>
        }
        </Alert>
      )}
         
            <br />

            <Form.Group className="mb-5 " controlId="modeOfLeave">
              <Form.Label className="label-styles">Mode of Leave</Form.Label>
              <Form.Control style={inputStyles}
                as="select"
                value={modeOfLeave}
                onChange={handleModeOfLeaveChange}
                required
                isInvalid={!!modeOfLeaveError}
              >
                <option value="">Select Mode of Leave</option>
                <option value="CL-CASUAL LEAVE">CL-CASUAL LEAVE</option>
                <option value="ML-MEDICAL LEAVE">ML-MEDICAL LEAVE</option>
                <option value="WFH-WORK FROM HOME">WFH-WORK FROM HOME</option>
                <option value="EP-EVENING PERMISSITION">EP-EVENING PERMISSITION</option>
                <option value="LP-LATE PERMISSITION">LP-LATE PERMISSITION</option>
                <option value="LOP-LOSS OF PAY">LOP-LOSS OF PAY</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {modeOfLeaveError}
              </Form.Control.Feedback>
            </Form.Group>

            {modeOfLeave === 'ML-MEDICAL LEAVE' && (
              <Form.Group className="mb-5" controlId="formFile">
                <Form.Label className="label-styles">Upload medical proof:</Form.Label>
                <Form.Control style={inputStyles}
                  type="file"
                  onChange={handleFileChange}
                  isInvalid={!!fileError}
                />
                <Form.Control.Feedback type="invalid">
                  {fileError}
                </Form.Control.Feedback>
              </Form.Group>
            )}

            <Form.Group className="mb-5" controlId="responsibility">
              <Form.Label className="label-styles">Responsibility</Form.Label>
              <Form.Control style={inputStyles}
                type="text"
                value={responsibility}
                onChange={(e) => setResponsibility(e.target.value)}
                isInvalid={!!responsibilityError}
              />
              <Form.Control.Feedback type="invalid">
                {responsibilityError}
              </Form.Control.Feedback>
            </Form.Group>

            <Container>
              <Row>
                <h3>Work Alteration</h3>
                <div>
                  <ul>
                    {concatenatedValues.map((value, index) => (
                      <span key={index}>
                        {value}
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveResponsibility(index)}
                        >
                          Remove
                        </Button>
                      </span>
                    ))}
                  </ul>
                </div>
              </Row>
            </Container>




            <Row>
              <Col className="mb-5">
                <Form.Group controlId="workResponsibility">
                  <Form.Label className="label-styles">Work</Form.Label>
                  <Form.Control id="workresponsibility_input" style={inputStyles}
                    type="text"
                    value={workResponsibility}
                    onChange={handleWorkResponsibilityChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="workAlteration">
                  <Form.Label className="label-styles">Name</Form.Label>
                  <Form.Control id="workalteration_input" style={inputStyles}
                    type="text"
                    value={workAlteration}
                    onChange={handleWorkAlterationChange}
                  />
                </Form.Group>
                {/* </Col>
      <Col className="mb-0"> */}
                <Button variant="warning" onClick={handleAddWorkResponsibility}>
                  Add
                </Button>
              </Col>
            </Row>
            <div className="mb-3 text-center ">
              <Button type="submit" variant="primary" >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
   
  );
}

export default Userleaveform;


