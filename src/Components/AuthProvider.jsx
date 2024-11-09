

import axios from 'axios';
import React, { createContext, useContext , useEffect, useState} from 'react';

import { toast } from 'react-toastify';

import { Navigate } from 'react-router-dom'

export const UserProvider = createContext();

export const AuthProvider = ({ children }) => {

     const API = 'https://the-techie-crud.onrender.com';

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const token = JSON.parse(localStorage.getItem('token'));


    useEffect(() => {
        if(token){
            setIsAuthenticated(true);
        }
    }, [isAuthenticated])


    const signup = async (data) => {
        try{
            console.log(data)
            const userData = await axios.post(`${API}/user-creation`, data);
            

            if(userData.data){
                return userData.data;
            }
        }catch(error){
            console.log(error)
            toast.error(error.response.data)
        }   
    }


    const login = async (data) => {
        try{
            const loginData = await axios.post(`${API}/user-login`, data);

            if(loginData.data){
                localStorage.setItem('token', JSON.stringify({token : loginData.data.loginToken }))
                setIsAuthenticated(true);
                return loginData
            }

        }catch(err){
            toast.error(err.response.data.message)
        }

    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        toast.success('Logged out successfully');
        return true;
    };



    const allOperations = {
        signup, 
        login,
        isAuthenticated,
        logout
    }

    

  return (
    <UserProvider.Provider value={allOperations} >
        {children}
    </UserProvider.Provider>
  )
}

