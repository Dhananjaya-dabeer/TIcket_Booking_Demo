'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

  const[userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    terms: false,
    hideAndshow: false
  })

  const handleSubmit = async(e) => {
    e.preventDefault()
    if( !userData.username && !userData.email && !userData.password && !userData.repeatPassword && !userData.terms )      return toast.warn("all fields are required !")
    else if(!userData.username) return toast.warn("username required !")
    else if(!userData.email) return toast.warn("user email required !")
    else if(!userData.password) return toast.warn("user password required !")
    else if(!userData.repeatPassword) return toast.warn("repeat password required !")
    else if(!userData.terms) return toast.warn("agree to terms and condtion!")
    else if(userData.password !== userData.repeatPassword) return toast.warn("password should match")
      const {repeatPassword, terms, hideAndshow, ...rest} = userData
     
    try {
      const response = await fetch ('api/signup', {
        method: 'POST',
        body: JSON.stringify(rest)
      })

      let result = await response.json()
      if(!response.ok) {
        toast.error(result.error.message || 'Internal error')
      }else{
        toast.success(result.message)
      }
      
    } catch (error) {
      toast.error(error.message || 'Internal error')

    }
  }
  
  // console.log(userData)
  const handleChange = (e) => {
   if(e.target.type == "email" || e.target.type === "password" || e.target.type === "text"){
    setUserData(prev => (
      {...prev,
       [e.target.id]: e.target.type == "email" ? e.target.value.toLowerCase() : e.target.value
      }
    ))
   } else{
    setUserData(prev => (
      {...prev,
       [e.target.id]: e.target.checked
      }
    ))
   }
  }
  
 
  return (
    <div className='h-screen w-screen flex items-center bg-[#F8FAFC]'>
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
        <input type="text" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com"  onChange={handleChange}/>
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com"  onChange={handleChange}/>
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type={userData.hideAndshow ? "text" : "password" } id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  onChange={handleChange} />
      </div>
      <div className="mb-5">
        <label htmlFor="repeatPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
        <input type={userData.hideAndshow ? "text" : "password" }id="repeatPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"   onChange={handleChange}/>
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input id="hideAndshow" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  onChange={handleChange}/>
        </div>
        <label htmlFor="hideAndshow" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show password</label>
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  onChange={handleChange}/>
        </div>
        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <Link href="/termsandcondtion" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</Link></label>
      </div>
      <div className="flex items-start mb-5 ml-4">
        <p  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Already have an account <Link href="/signin" className="text-blue-600 hover:underline dark:text-blue-500">Signin</Link></p>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
    </form>
    </div>
  )
}

export default page