

import React, { useContext, useState } from 'react';

import { Spinner } from 'react-bootstrap'

import './Login.css'
import { Link, useNavigate} from 'react-router-dom';

import { UserProvider } from '../AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });


  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const { login } = useContext(UserProvider)


  const loginHandler= async (e) => {
   try {
    setLoading(true)
    
    e.preventDefault();
    const userData = await login(loginData);
    if(userData?.data){
      toast.success("User logged in successfully...");
      setLoading(false)
      return navigate('/dashboard')
    }

   } catch (error) {
    console.log(error.response.data.message);
    setLoading(false)
   }

  }

  const loginInputData = (e) => {

    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name] : value,
    })

  }


  return (
    <>
    <div className='spinner' >
      {loading && <Spinner  size={250} animation="border" variant="danger"   /> }
    </div>
    <div className='bg-secondary d-flex justify-content-center align-items-center vh-100' >
        <form className='text-center d-flex flex-column form-container' >
            <input onChange={loginInputData} name='email' className='form-control login-inputs' type="email" placeholder='Email...' />
            <input onChange={loginInputData} name='password' className='form-control login-inputs' type="password" placeholder='Password...' />
            <button onClick={loginHandler} className='btn btn-outline-warning login-btn' >Login</button>
            <div className='mt-2' >
                <Link to='/signup' className='text-white text-decoration-none'  >New User? Create an account</Link>
            </div>
        </form>
    </div>
    </>
  )
}

export default Login 