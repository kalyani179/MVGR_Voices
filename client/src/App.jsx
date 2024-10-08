import React,{createContext, useEffect, useState} from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"; 
import { lookInSession } from './common/session';
import Editor from './components/Blogs/Blog Editor/Editor';
import Home from './pages/Home';
import BlogsHome from './components/Blogs/Blog Home/BlogsHome';
import BlogsSearchPage from './pages/BlogsSearchPage';
import BlogsNavbar from './components/Blogs/Blogs Navbar/BlogsNavbar';
import PageNotFound from './pages/404Page';
import UserProfilePage from './pages/UserProfilePage';
import EmailVerification from './components/Authentication/EmailVerification';
import BlogPage from './components/Blogs/Blog Page/BlogPage';
import SideNav from './common/SideNav';
import ChangePassword from './components/Settings/ChangePassword';
import EditProfile from './components/Settings/EditProfile';
import ManageBlogs from './components/Dashboard/ManageBlogs';
import Contact from './components/Contact/Contact';

import PodsNavbar from './components/Podcast/Podcast Navbar/PodsNavbar';
import Podcast from './components/Podcast/Podcast Home/Podcast';
import UploadPodcast from './components/Podcast/Podcast Upload/UploadPodcast';
import PodcastSearchPage from './pages/PodcastSearchPage';

import FeedbackForm from './components/Home/Review Carousel/FeedBackForm';
import ForgotPassword from './components/Authentication/ForgotPassword';
import ResetPassword from './components/Authentication/ResetPassword';
import ManagePodcasts from './components/Dashboard/ManagePodcasts';
//import PodcastPlayer from './components/Podcast/Podcast Player/PodcastPlayer';
import Noitifications from './components/Dashboard/Noitifications';
import UserLiked from './components/Dashboard/UserLiked';


export const UserContext = createContext({});
export const SearchContext = createContext({});
export const ThemeContext = createContext({});

const App = () => {
  const [userAuth,setUserAuth] = useState({});
  const [theme,setTheme] = useState("light");
  const [searchBoxVisibility,setSearchBoxVisibility] = useState(false);
  const [isValidToken,setValidToken] = useState(false);
  useEffect(() => {
    let userInSession = lookInSession("user");
    let themeInSession = lookInSession("theme");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token : null});
    themeInSession ? setTheme(()=>{
      document.body.setAttribute("data-theme",themeInSession);
      return themeInSession;
    }) : document.body.setAttribute("data-theme",theme);
  },[])

  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      <SearchContext.Provider value={{searchBoxVisibility,setSearchBoxVisibility}}>
      <UserContext.Provider value={{userAuth,setUserAuth,isValidToken,setValidToken}}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:username/verify/:access_token" element={<EmailVerification/>}/>
              <Route path="/signin/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
              <Route path="/" element={<BlogsNavbar />}>
                <Route path="blogs" element={<BlogsHome />} />
                <Route path="search/:query" element={<BlogsSearchPage />}/>
                <Route path="blog/:blog_id" element={<BlogPage />}/>
              </Route>
              <Route path="/editor" exact element={<Editor />} />
              <Route path="/editor/:blog_id" exact element={<Editor />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/contact" element={<Contact />}/>

              <Route path="/" element={<PodsNavbar />}>
                <Route path="podcasts" element={<Podcast />} />
                <Route path="podcasts/search/:query" element={<PodcastSearchPage />}/>
              </Route>
              <Route path='/upload' element={<UploadPodcast />} />

              <Route path="/user/:id" element={<UserProfilePage />}/>
              <Route path="settings" element={<SideNav />}>
                    <Route path="edit-profile" element={<EditProfile />}/>
                    <Route path="change-password" element={<ChangePassword />}/>
              </Route>
              <Route path="/dashboard" element={<SideNav />}>
                    <Route path="podcasts" element={<ManagePodcasts/>}/>
                    <Route path="blogs" element={<ManageBlogs />}/>  
                    <Route path="notifications" element={<Noitifications />}/>    
                    <Route path="liked" element={<UserLiked />}/> 
              </Route>
              <Route path="/feedback" element={<FeedbackForm />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      </SearchContext.Provider>
    </ThemeContext.Provider>
  
  )
}

export default App