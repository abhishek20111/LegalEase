import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, updateToken } from './store/UserSlice';
import Navbar from './component/Navbar';
import { Route, Routes } from 'react-router-dom';
import Signin from './component/Signin';
import Signup from './component/Signup';
import Home from './component/Home';
import About from './component/About';
import { ToastContainer } from 'react-toastify';
import Logout from './component/Logout';
import Profile from './component/Profile';
import Forum from './component/Forum';
import MessagePage from './component/message/MessagePage';
import SearchLawyer from './component/SearchLawyer';

export default function App() {

  const USER_TYPE = {
    PUBLIC: "Public User",
    USER: "User",
    ADMIN: "Admin",
    MEDIATER:"Mediater",
    SUPER_ADMIN: "Super Admin",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(updateToken(token));
      dispatch(setIsLogin(true));
    }
  }, [dispatch]);

  function AppRoutes() {
    const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);

    return (
      <Routes>
        <Route path='/signin' element={<PublicElement><Signin /></PublicElement>} />
        <Route path='/signup' element={<PublicElement><Signup /></PublicElement>} />
        <Route path='/about' element={<PublicElement><About /></PublicElement>} />
        <Route path='/searchlawer' element={<PublicElement><SearchLawyer /></PublicElement>} />
        <Route path='/forum' element={<UserElement><Forum /></UserElement>} />
        <Route path='/profile' element={<UserElement><Profile /></UserElement>} />
        <Route path='/logout' element={<PublicElement><Logout /></PublicElement>} />
        <Route path='/message' element={<UserElement><MessagePage /></UserElement>} />
        <Route path='/' element={<PublicElement><Home /></PublicElement>} />
      </Routes>
    )
  }

  function PublicElement({ children }) {
    return <>{children}</>;
  }

  function UserElement({ children }) {
    const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);

    if (CURRENT_USER_TYPE === USER_TYPE.USER ||
      CURRENT_USER_TYPE === USER_TYPE.ADMIN ||
      CURRENT_USER_TYPE === USER_TYPE.MEDIATER ||
      CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN) {
      return <>{children}</>
    }
    else return <>Do not have access to this , Login Again</>
  }

  function MediaterElement({ children }) {
    const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);

    if (CURRENT_USER_TYPE === USER_TYPE.MEDIATER ||
      CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN) {
      return <>{children}</>
    }
    else return <>Do not have access to this , Login Again</>
  }


  function OnlyUserElement({ children }) {
    const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);

    if (CURRENT_USER_TYPE === USER_TYPE.USER) return <>{children}</>;
    else return <>You do not need to access this site</>;
  }

  function AdminElement({ children }) {
    const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);
  
    if (
      CURRENT_USER_TYPE === USER_TYPE.ADMIN ||
      CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN
    )
      return <>{children}</>;
    else return <>do not access to Admin domain</>;
  }
  
  return (
    <div className='min-h-screen '>
      <Navbar />
      <AppRoutes />
      <ToastContainer/>
    </div>
  )
}
