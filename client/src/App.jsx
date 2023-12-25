import React from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"; 
import Navbar from './components/Home/Navbar/Navbar';
import UserAuthForm from './components/Authentication/UserAuthForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/signup" element={<UserAuthForm type="sign-up" />}/>
          <Route path="/signin" element={<UserAuthForm type="sign-in" />}/> 
          
          {/* <Route path="/editor" element={<Editor />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App