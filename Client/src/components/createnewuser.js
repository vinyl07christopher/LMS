import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function CreateNewUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('')
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [emp_id, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [date_of_joining, setDate_of_Joining] = useState('');


  const handleNameChange = (e) => {

    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };



  const ComapanyChange = (e) => {
    const selectedCompany = e.target.value;

    setCompany(selectedCompany);

    // Set employee ID based on the selected company
    let generatedEmpId = '';
    if (selectedCompany === 'IRO') {
      generatedEmpId = 'IRO-';
    } else if (selectedCompany === 'EJESRA') {
      generatedEmpId = 'EJ-';
    } else if (selectedCompany === 'CONFYY') {
      generatedEmpId = 'CFY-';
    }

    setEmpId(generatedEmpId);
  };

  const EmployeeId = (e) => {
    setEmpId(e.target.value);
  }

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  }

  const handleButtonClick = (path) => {
    // window.location.href = path;
  };


  const handleDateOfJoiningChange = (e) => {
    setDate_of_Joining(e.target.value);

  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    // Validate email
    if (!email) {
      validationErrors.email = 'Email is required';
    }

    // Validate password
    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long';
    }

    // Validate role
    if (!role) {
      validationErrors.role = 'Role is required';
    }
    if (!company) {
      validationErrors.company = 'Company is required';
    }
   
    if (!emp_id) {

      validationErrors.emp_id = "Please enter the employee_id";
    }

    if (!name) {

      validationErrors.name = "Please enter your name";
    }

    if (!designation) {

      validationErrors.designation = "Please enter your designation"
    }
    if(!date_of_joining){
      validationErrors.date_of_joining ="Please select the date_of_joining";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Make an API request to register the user
      axios
        .post('/api/register', {
          name,
          email,
          password,
          role,
          company,
          emp_id,
          designation,
          date_of_joining
        })
        .then((response) => {
          const { message } = response.data;
          alert(message);
          window.location.href = '/dashboard';
          resetForm();
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert('An error occurred. Please try again later.');
          }
        });

      // Send leave application response to backend
      axios
        .get(`/leave-response?response=accepted&email=${email}`)
        .then((response) => {
          // Handle the response data if needed
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error if needed
        });
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('');
    setCompany('');
    setEmpId('');
    setDesignation('');
    setDate_of_Joining('');
    setErrors({});
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

  const signupStyles = {
    position: "relative",
    width: "100%",
    height: "100%",
  };



  const buttonStyles = {
    width: "50%",
    height: "40px",
    margin: "10px auto",
    justifyContent: "center",
    display: "block",
    // color: "#fff",
    // background: "block",
    background: "#0f62fe",
    fontSize: "1em",
    fontWeight: "bold",
    marginTop: "20px",
    outline: "none",
    border: "none",
    borderRadius: "5px",
    transition: "0.2s ease-in",
    cursor: "pointer",
  };
  return (

    <div className='mx-auto' style={mainStyles}>
      <div className="signup" style={signupStyles}>
        <h1>Create New User</h1><br />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <div className='d-flex  '>

              <Form.Control className='my-auto mr-3'
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback className='my-auto ml-3' type="invalid">{errors.password}</Form.Control.Feedback>


              <Form.Check className='my-auto ml-3'
                type="checkbox"
                label={<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />}
                onChange={handleShowPassword}
              />

            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={handleRoleChange}
              isInvalid={!!errors.role}
            >
              <option value="" disabled>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
            </Form.Control>


            <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupRole">
            <Form.Label>Select Company</Form.Label>
            <Form.Control
              as="select"
              value={company}
              onChange={ComapanyChange}
              isInvalid={!!errors.company}
            >
              <option value="" disabled>Select Company</option>
              <option value="IRO">IRO</option>
              <option value="EJESRA">EJESRA</option>
              <option value="CONFYY">CONFYY</option>
            </Form.Control>


            <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formGroupEmpId">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              value={emp_id}
              placeholder="Enter employee_id"

              onChange={EmployeeId}
              isInvalid={!!errors.emp_id}
            />
            {errors.emp_id && <Form.Control.Feedback type="invalid">{errors.emp_id}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter designation"
              value={designation}
              onChange={handleDesignationChange}
              isInvalid={!!errors.designation}
            />
            <Form.Control.Feedback type="invalid">{errors.designation}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupDateOfJoining">
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control
              type="date"
              value={date_of_joining}
              onChange={handleDateOfJoiningChange}
              isInvalid={!!errors.date_of_joining}
            />
            <Form.Control.Feedback type="invalid">{errors.date_of_joining}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 mt-5">
            <Button style={buttonStyles}
              type="submit">Create User</Button>
          </Form.Group>
        </Form>
      </div>
    </div>

  );
}

export default CreateNewUser;


