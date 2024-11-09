
import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate }  from 'react-router-dom';
import { UserProvider } from './Components/AuthProvider';



const Header = lazy(() => import('./Components/Header/Header'));
const Home = lazy(() => import('./Components/Home/Home'));
const Login = lazy(() => import ('./Components/Login/Login'));
const Signup = lazy(() => import('./Components/Signup/Signup'));
const Contact = lazy(() => import('./Components/Contact us/Contact us'))
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'))
const ProductInfo = lazy(() => import('./Components/ProductInfo'))
const Checkout = lazy(() => import('./Components/CheckOutPage/CheckOut'))
const Cart = lazy(() => import('./Components/Cart/Cart'))

const App = () => {


  const [cartItems,  setCartItems] = useState([]);


  const addToCart = (item) => {
    setCartItems((prevState) => [...prevState, item])
  }


  console.log(cartItems)

  
  return (
    <BrowserRouter>
     
    <Header />
    <Suspense fallback={ <h1>Loading the component....</h1> } >
         <Routes>
           
            <Route path='/' element={<Home/>}/>
            
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/dashboard' element={<Dashboard /> } />
            <Route path='/product/:id' element={<ProductInfo addToCart={addToCart} /> } />
            <Route path='/Checkout' element={<Checkout />}   />
            <Route path='/cart' element={<Cart cart={cartItems} />} />
            <Route path='*' element={<h1>Page Not found</h1>} />            
        </Routes>
    </Suspense>

    </BrowserRouter>
  )
}



export default App;






