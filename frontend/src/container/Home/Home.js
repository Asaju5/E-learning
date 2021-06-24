import React from 'react'
import Header from '../Header'

function home() {
    return (
     <>
       <Header />
       <div className="flex items-center justify-center  bg-indigo-600  py-12 px-4 sm:px-6 lg:px-8"> 
      <div className="max-w-md w-full space-y-8">
      <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Simpu E-Learning
            </h1>
          </div>
      </div>
     </div>

       
     </>
    )
}

export default home
