import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, updateToken } from "./store/UserSlice";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Home from "./component/Home";
import About from "./component/About";
import { ToastContainer } from "react-toastify";
import Logout from "./component/Logout";
import Profile from "./component/Profile";
import Sidebar from "./component/Sidebar";
import LandingPage from "./component/LandingPage";
import { Link } from "react-router-dom";
import SearchLawyer from "./component/SearchLawyer";
import Mainprofile from "./component/Mainprofile";

export default function App() {
  const USER_TYPE = {
    PUBLIC: "Public User",
    USER: "User",
    ADMIN: "Admin",
    MEDIATER: "Mediater",
    SUPER_ADMIN: "Super Admin",
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const isLogin = useSelector((state) => state.userData.isLogin);

  useEffect(() => {
    setLoadingVisible(false);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        <Route path='/review' element={<UserElement><Review /></UserElement>} />
        <Route path='/manageUser' element={<MediaterElement><MangeUser /></MediaterElement>} />
        <Route path='/superManageUser' element={<SuperAdminElement><Super_Manage/></SuperAdminElement>} />
        <Route path='/' element={<PublicElement><LandingPage /></PublicElement>} />
      </Routes>
    );
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

  function SuperAdminElement({ children }) {
    const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);
  
    if (
      CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN
    )
      return <>{children}</>;
    else return <>do not access to Admin domain</>;
  }


  return (
    // <div className='min-h-screen '>
    //   <Sidebar />
    //   <AppRoutes />
    //   <ToastContainer/>
    // </div>
    <div
      className={`flex h-screen  text-gray-900 bg-gray-100 dark:bg-dark dark:text-light`}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 flex  transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Curvy shape */}
        <svg
          className="absolute inset-0 right-0 w-full h-full text-white"
          style={{ filter: "drop-shadow(10px 0 10px #00000030)" }}
          preserveAspectRatio="none"
          viewBox="0 0 309 800"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
        </svg>
        {/* Sidebar content */}
        <div className="z-50 flex flex-col flex-1">
          <div className="flex items-center justify-between flex-shrink-0 w-64 p-4">
            {/* Logo */}
            <a
              href="#"
              className="text-blue-800 font-medium text-4xl font-serif italic "
            >
              <span className="sr-only">LegalEase</span>
              legalEase
            </a>
            {/* Close btn */}
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg focus:outline-none focus:ring"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close sidebar</span>
            </button>
          </div>
          <nav className="flex flex-col flex-1 w-64 p-4 mt-4">
            <Link to="/" className="flex items-center space-x-2" onClick={toggleSidebar}>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Home</span>
            </Link>
            {isLogin ? (
              <>
                <div onClick={toggleSidebar}>
                  <Link to="/profile">Profile </Link>
                </div>
                <div onClick={toggleSidebar}>
                  <Link to="/logout">Logout </Link>
                </div>
              </>
            ) : (
              <>
                <div onClick={toggleSidebar}>
                  <Link to="/signin " className=" flex -ml-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z" />
                    </svg>
                    <div className="ml-3">Signin</div>
                  </Link>
                </div>
              </>
            )}
            <div onClick={toggleSidebar}>
              <Link to="/search" className="flex gap-x-1 ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 8h-8v-1h8v1zm0 2h-8v-1h8v1zm-3 2h-5v-1h5v1zm11.172 12l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
                </svg>
                Search
              </Link>
            </div>
            <div onClick={toggleSidebar}>
              <Link to="/about" className="flex gap-x-1" >
                <svg
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7"
                >
                  <path
                    d="m2.394 15.759s7.554 4.246 9.09 5.109c.165.093.333.132.492.132.178 0 .344-.049.484-.127 1.546-.863 9.155-5.113 9.155-5.113.246-.138.385-.393.385-.656 0-.566-.614-.934-1.116-.654 0 0-7.052 3.958-8.539 4.77-.211.115-.444.161-.722.006-1.649-.928-8.494-4.775-8.494-4.775-.502-.282-1.117.085-1.117.653 0 .262.137.517.382.655zm0-3.113s7.554 4.246 9.09 5.109c.165.093.333.132.492.132.178 0 .344-.049.484-.127 1.546-.863 9.155-5.113 9.155-5.113.246-.138.385-.393.385-.656 0-.566-.614-.934-1.116-.654 0 0-7.052 3.958-8.539 4.77-.211.115-.444.161-.722.006-1.649-.928-8.494-4.775-8.494-4.775-.502-.282-1.117.085-1.117.653 0 .262.137.517.382.655zm10.271-9.455c-.246-.128-.471-.191-.692-.191-.223 0-.443.065-.675.191l-8.884 5.005c-.276.183-.414.444-.414.698 0 .256.139.505.414.664l8.884 5.006c.221.133.447.203.678.203.223 0 .452-.065.689-.203l8.884-5.006c.295-.166.451-.421.451-.68 0-.25-.145-.503-.451-.682z"
                    fill-rule="nonzero"
                  />
                </svg>
                About{" "}
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="w-full">
        <main className="flex mx-auto">
          <div onClick={toggleSidebar}
            className={`inset-0 fixed w-full h-full bg-black bg-opacity-70 z-10 ${
              isSidebarOpen ? "" : "hidden"
            }`}
          ></div>
          {/* Page content */}
          <button
            onClick={toggleSidebar}
            className={`fixed p-2 z-20 text-black rounded-lg top-5 left-5 ${
              isSidebarOpen ? "hidden" : ""
            }`}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="sr-only">Open menu</span>
          </button>
          <div className="w-full">
            <AppRoutes />
            <ToastContainer />
          </div>
        </main>
      </div>
    </div>
  );
}
