import React, {useEffect, useContext} from "react";
import {Link } from "react-router-dom";
import { SearchIcon, BookOpenIcon } from "@heroicons/react/solid";
import {Context} from '../../Context'
import axios from 'axios'
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from "react-router-dom";

function Header(props) {

  const {state, dispatch} = useContext(Context)
  const {user} = state
  const history = useHistory()

  const logout = async () => {
    dispatch({type: "LOGOUT"})
    window.localStorage.removeItem('user')
    const {data} = await axios.get(`http://localhost:4000/api/logout`);
    toast(data.message);
    history.push('/login')
  }


  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      <div className="flex items-center">
        {/* leftComponents */}
        <Link to="/">
          <img
            src={
              require("./images/18db42423ee2dcda71bd010e4de43e8f.png").default
            }
            alt="Simpu"
            width={60}
            height={60}
            layout="fixed"
          />
        </Link>
      </div>

      {/* center */}
      <div className="flex justify-center flex-grow">
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2 space-x-2 md:px-10 sm:h-10 rounded-xl">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex items-center bg-transparent outline-none placeholder-gray-400 flex-shrink"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className=" flex items-center sm:space-x-2 justify-end">
       {
         user === null && (
           <>
            <button>
              <Link
                className=" rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer text-primary"
                to="/login"
              >
                Login
              </Link>
        </button>
        <button>
            <Link
              className=" rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer text-primary"
              to="/register"
            >
              Register
            </Link>
        </button>
           </>
         )}

       
       {
         user !== null && 
         <button>
            <Link
              className=" rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer text-primary"
            >
             Logout
            </Link>
        </button>
       }
        <BookOpenIcon className="h-10 text-blue-600" />
      </div>

    </div>
  );
}

export default Header;
