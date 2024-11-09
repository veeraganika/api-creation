

import React, { useState, useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import  { UserProvider } from '../AuthProvider'

import './Signup.css'
import { toast } from 'react-toastify';


const Signup = () => {

  const [userSignup, setUserSignup] =useState({
    fullName : '',
    mobile: '',
    email: '',
    password: '',
    address: ''
  })


  const navigate = useNavigate()

  const { signup } = useContext(UserProvider);


  const userInputData= (e) => {

    const { name, value } = e.target;

    setUserSignup({
      ...userSignup,
      [name] : value
    })
  }

  console.log(userSignup)

  const signupHandler =  async (e) => {
    e.preventDefault();
    const userData = await signup(userSignup);

    if(userData){
      toast.success("User signed up successfully");
      return navigate('/login')
    }

  }


  return (
    <div className='bg-secondary d-flex justify-content-center align-items-center vh-100' >
        <form className='text-center d-flex flex-column signup-form-container' >
            <input name='fullName' onChange={userInputData} className='form-control signup-inputs' type="text" placeholder='Full name...' />
            <input name='mobile' onChange={userInputData} className='form-control signup-inputs' type="number" placeholder='Mobile...' />
            <input name='email' onChange={userInputData} className='form-control signup-inputs' type="email" placeholder='Email...' />
            <input name='password' onChange={userInputData} className='form-control signup-inputs' type="password" placeholder='Password...' />
            <input name='address' onChange={userInputData} className='form-control signup-inputs' type="text" placeholder='Address...' />
            <button className='btn btn-outline-warning signup-btn' onClick={signupHandler} >Signup</button>
            <div className='mt-2' >
                <Link to='/login' className='text-white text-decoration-none'  >Already have an account? Login here</Link>
            </div>
        </form>
    </div>
  )
}

export default Signup