import React from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"; 
import Navbar from './components/Home/Navbar/Navbar';
// import UserAuthForm from './components/Authentication/UserAuthForm';
// import DummyNavbar from './components/Home/Navbar/DummyNavbar';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navbar />} />
        
          {/* <Route path="/editor" element={<Editor />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App