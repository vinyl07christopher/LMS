
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Home from "./Home";
import Admin from "./Admin";
import HR from "./HR";
import User from "./User";
import Userleaveform from "./components/Userleaveform";
import Dashboard from "./components/dashboard";

import Createnewuser from "./components/createnewuser";
// import { UserProvider } from './UserContext';

import Userstored from "./userstored";

export default function App() {



  return (
    // <UserProvider>

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Admin />} />
          <Route path="contact" element={<HR />} />
          <Route path="user" element={<User />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userleaveform" element={<Userleaveform />} />
          <Route path="userleaveform" element={<Dashboard />} />
          <Route path="Createnewuser" element={<Createnewuser />} />
          <Route path="Userstored" element={<Userstored />} />

        </Route>
      </Routes>
    </BrowserRouter>
    // </UserProvider>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

