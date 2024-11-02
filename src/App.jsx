import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

const App = () => {
  const [passwordArray, setPasswordArray] = useState([]);
  const [username, setUsername] =useState("");

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={<SignUp passwordArray={passwordArray} setPasswordArray={setPasswordArray} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
