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
import EmailVerification from './components/Authentication/EmailVerification';
import BlogPage from './components/Blogs/BlogPage/BlogPage';
import Podcast from './components/Podcast/Podcast';
import PodsNavbar from './components/Podcast/Podcast Navbar/PodsNavbar';
//import Upload from './components/Podcast/Upload';
export const UserContext = createContext({});

const App = () => {
  const [userAuth,setUserAuth] = useState({});
  const [isValidToken,setValidToken] = useState(false);
  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token : null})
  },[])

  return (
    <UserContext.Provider value={{userAuth,setUserAuth,isValidToken,setValidToken}}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:username/verify/:access_token" element={<EmailVerification/>}/>
            <Route path="/" element={<BlogsNavbar />}>
              <Route path="blogs" element={<BlogsHome />} />
              <Route path="search/:query" element={<BlogsSearchPage />}/>
              <Route path="user/:id" element={<UserProfilePage />}/>
              <Route path="blog/:blog_id" element={<BlogPage />}/>
            </Route>
            <Route path="/editor" exact element={<Editor />} />
            <Route path="/editor/:blog_id" exact element={<Editor />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<PodsNavbar />}>
              <Route path="podcast" element={<Podcast />} />
            </Route>
           


           
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App