import React,{createContext, useEffect, useState} from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"; 
import { lookInSession } from './common/session';
import Editor from './components/Blogs/Editor';
import Home from './pages/Home';
import BlogsHome from './components/Blogs/BlogsHome';
import BlogsSearchPage from './pages/BlogsSearchPage';
import BlogsNavbar from './components/Blogs/Blogs Navbar/BlogsNavbar';
import PageNotFound from './pages/404Page';
import UserProfilePage from './pages/UserProfilePage';
import Pod from './components/Podcast/Pod';
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
              <Route path="user/:id" element={<UserProfilePage />}/>
            </Route>
            <Route path="/editor" exact element={<Editor />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="podcast" element={<Pod />}></Route>
            
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App