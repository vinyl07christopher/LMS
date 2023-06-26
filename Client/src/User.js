import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import dashboard from './components/dashboard';
import "./styles.css";

function User() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleButtonClick =(path)=>{

    // Navigate to the specified path
    window.location.href = path;
  
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validate email
    if (!email) {
      validationErrors.email = "Email is required";
      console.log('Email is required');
    }

    // Validate password
    if (!password) {
        validationErrors.password = "Password is required";
      } else if (password.length < 8) {
        validationErrors.password = "Password must be at least 8 characters long";
      } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
        validationErrors.password =
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
      }
    

    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } 
else{
    const correctEmail = "user@gmail.com";
    const correctPassword = "User@123";

if(email === correctEmail && password === correctPassword){

    alert('Login In Successful');

    // Reset form
    setEmail("");
    setPassword("");
    setErrors({});
}
else{

    alert('Incorrect email or password');

     // Reset form
     setEmail("");
     setPassword("");
     setErrors({});
}

}
  
   
  };


 
  

  return (
    <div className="App">
      <h1>User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={() => handleButtonClick("/dashboard")}>Login</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default User;
