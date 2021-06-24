import React, { useState, useContext} from "react";
import Header from "../Header";
import {Link} from 'react-router-dom'
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import {Context} from "../../Context"
import { useHistory } from "react-router-dom";


function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  //state
  const {state, dispatch} = useContext(Context)

  const history = useHistory()


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post(`http://localhost:4000/api/login`, {
      email,
      password,
    });
    setLoading(false);
    //console.log("LOGIN_RESPONSE", data);
    dispatch({
      type: "LOGIN",
      payload: data
    })
    history.push("/")
    window.localStorage.setItem('user', JSON.stringify(data))
  };

  return (
    <div>
      <Header />
      <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">


          <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" class="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label for="password" class="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    class=" mt-2 ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <Link
                    class=" mt-2 font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 
                border border-transparent text-sm font-medium rounded-md text-white 
                bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-indigo-500"
                disabled={!email || !password || loading}
              >
                {loading ? <SyncOutlined spin /> : "Login"}
              </button>
            </div>

            <div className="items-center justify-center mt-5">
                Not Registered? <Link to="/register" className="text-purple-600">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
