import React,{createContext, useEffect, useState} from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"; 
import { lookInSession } from './common/session';
import Editor from './components/Blogs/Editor';
import Home from './pages/Home';
import BlogsHome from './components/Blogs/BlogsHome';
import BlogsSearchPage from './pages/BlogsSearchPage';
import BlogsNavbar from './components/Blogs/Blogs Navbar/BlogsNavbar';

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
            <Route path="/" element={<BlogsNavbar />}>
              <Route path="blogs" element={<BlogsHome />} />
              <Route path="search/:query" element={<BlogsSearchPage />}/>
            </Route>
            <Route path="/editor" exact element={<Editor />} />
            
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App