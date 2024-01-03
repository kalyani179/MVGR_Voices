import React,{createContext, useEffect, useState} from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"; 
import Navbar from './components/Home/Navbar/Navbar';
import { lookInSession } from './common/session';

export const UserContext = createContext({});

const App = () => {
  const [userAuth,setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token : null})
  },[])

  return (
    <UserContext.Provider value={{userAuth,setUserAuth}}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App