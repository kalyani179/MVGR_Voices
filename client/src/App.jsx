import React,{createContext, useEffect, useState} from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"; 
import { lookInSession } from './common/session';
import Editor from './components/Blogs/Editor';
import Home from './pages/Home';

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
            <Route path="/" element={<Home />} />
            <Route path="/blogs" exact element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App