import { Outlet, redirect } from "react-router-dom";
import { Navbar, Nav,Link  } from "react-bootstrap";
import axios  from "axios";

const Layout = () => {


  const logout =()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_role');
      window.location.href = '/';
      
  }


  //navbar style in inline in the react css


  const navbarStyles = {
    // backgroundColor: 'green',
    padding: '10px',
  };

  const navLinkStyles = {
    // color: 'red',
    marginRight: '10px',
    cursor: 'pointer',
    
  };

  return (
    // <>
    //   <Navbar bg="light" expand="lg">
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="mr-auto">
    //         <Navbar.Brand href="/">Home</Navbar.Brand>
    //         <Nav.Link onClick={logout}>Logout</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    //   <Outlet />
    // </>
    <>
    <Navbar style={navbarStyles} expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Brand href="/" style={navLinkStyles}>Home</Navbar.Brand>
          <Nav.Link onClick={logout} style={navLinkStyles}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Outlet />
  </>
   
  );
};

export default Layout;
