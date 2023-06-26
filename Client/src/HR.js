


// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import dashboard from './components/dashboard';
// import "./styles.css";

// function Contact() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleButtonClick =(path)=>{

//     // Navigate to the specified path
//     window.location.href = path;
  
//   }
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = {};

//     // Validate email
//     if (!email) {
//       validationErrors.email = "Email is required";
//       console.log('Email is required');
//     }

//     // Validate password
//     if (!password) {
//         validationErrors.password = "Password is required";
//       } else if (password.length < 8) {
//         validationErrors.password = "Password must be at least 8 characters long";
//       } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
//         validationErrors.password =
//           "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
//       }
    

//     // Check if there are any errors
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } 
// else{
//     const correctEmail = "hr@gmail.com";
//     const correctPassword = "hr@123";

// if(email === correctEmail && password === correctPassword){

//     alert('Login In Successful');

//     // Reset form
//     setEmail("");
//     setPassword("");
//     setErrors({});
// }
// else{

//     alert('Incorrect email or password');

//      // Reset form
//      setEmail("");
//      setPassword("");
//      setErrors({});
// }

// }
  
   
//   };


 
  

//   return (
//     <div className="App">
//       <h1>HR</h1>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="formGroupEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={handleEmailChange}
//             isInvalid={!!errors.email}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.email}
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formGroupPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={handlePasswordChange}
//             isInvalid={!!errors.password}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.password}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group as={Row} className="mb-3">
//           <Col sm={{ span: 10, offset: 2 }}>
//             <Button type="submit" onClick={() => handleButtonClick("/dashboard")}>Login</Button>
//           </Col>
//         </Form.Group>
//       </Form>
//     </div>
//   );
// }

// export default Contact;


import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import dashboard from './components/dashboard';
import "./styles.css";

import axios from 'axios';

function Contact() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // const handleButtonClick =(path)=>{

  //   // Navigate to the specified path
  //   window.location.href = path;
  
  // }
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
    

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        axios
          .post('/api/login', {
            email,
            password,
          })
          .then((response) => {
            const { token } = response.data;
    

            
            
            // Save the token in local storage or any other secure location
            localStorage.setItem('token', token);
    
            // Reset form and errors
            setEmail('');
            setPassword('');
            setErrors({});
    

axios
.get('api/user',{

  headers:{

    Authorization:`Bearer ${token}`,
  },
})

.then((response) =>{

  window.location.href = '/dashboard';

})


            // Redirect to the dashboard or any other protected page
          })
          .catch((error) => {
            // Handle error response from the backend (e.g., incorrect credentials)
            if (error.response && error.response.data && error.response.data.message) {
              alert(error.response.data.message);
            } else {  
              alert('An error occurred. Please try again later.');
            }
          });
      }
  
   
  };


  return (
    <div className="App">
      <h1>HR</h1>
      <br/>
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
            <Button type="submit" 
            // onClick={() => handleButtonClick("/dashboard")}
            >Login</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Contact;


