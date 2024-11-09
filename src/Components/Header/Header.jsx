// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingBag } from "react-icons/fa";
// const Header = () => {
//   return (
//     <div className='d-flex justify-content-around align-items-center bg-success text-white'>
//       <div className='d-flex  align-items-center'>
//         {/* <img src='' alt="logo"/> */}
//         <FaShoppingBag size={50} />
//         <h1> <Link className='text-decoration-none text-white' to='/' >Shopping Mall</Link> </h1>
//       </div>
//       <ul className='d-flex '> 
//       {/* <li className='list-unstyled ms-3' ><Link className='text-decoration-none text-white' to='/Home' >Home</Link></li> */}
//     <li className='list-unstyled ms-3' ><Link className='text-decoration-none text-white' to='/login' >Login</Link></li>
//     <li className='list-unstyled ms-3' ><Link className='text-decoration-none text-white' to='/contact' >Contact</Link></li>
//       </ul>
//     </div>
//   )
// }

// (-------------------------------)
// 



// import React, { useContext }  from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FcReddit } from "react-icons/fc";
// import { UserProvider } from '../AuthProvider';
// import { toast } from 'react-toastify';


// const Header = () => {
//   const { isAuthenticated, logout } = useContext(UserProvider)
//   const navigate = useNavigate();
//   const userLogoutHandler = async () => {
//     const data = await logout();
//     if (data) {
//         navigate('/');
//     }
// };
//   return (
//     <div className='d-flex  justify-content-around align-items-center bg-dark text-white p-3' >
//         <div className='d-flex align-items-center' >
//       <FcReddit size={50} />
//       <h1> <Link className='text-decoration-none text-white' to='/' >E-comm</Link> </h1>
//         </div>
//         <ul className='d-flex' >
//             {/* <li className='list-unstyled ms-3' ><Link className='text-decoration-none text-white' to='/' >Home</Link></li> */}
//             <li className='list-unstyled ms-3' >{isAuthenticated ? <Link className='text-decoration-none text-white' onClick={userLogoutHandler} >Logout</Link> :  <Link className='text-decoration-none text-white' to='/login' >Login</Link>}</li>
//             <li className='list-unstyled ms-3' ><Link className='text-decoration-none text-white' to='/contact' >Contact</Link></li>
//         </ul>
//     </div>
//   )
// }

// export default Header;
// aug2
import React, { useContext }  from 'react';

import { Link, useNavigate } from 'react-router-dom';
 import { FaShoppingBag } from "react-icons/fa";

import { UserProvider } from '../AuthProvider';
import { toast } from 'react-toastify';


const Header = () => {


  const { isAuthenticated, logout } = useContext(UserProvider)

  const navigate = useNavigate();


  const userLogoutHandler = async () => {
    const data = await logout();
    if (data) {
        navigate('/');
    }
};


  return (
    <div className='d-flex  justify-content-around align-items-center bg-success text-white p-3' >
        <div className='d-flex align-items-center' >
            <FaShoppingBag  size={50} />
            <h1> <Link className='text-decoration-none text-white' to='/' >Shopping Mall</Link> </h1>
        </div>
        <ul className='d-flex' >
           
            <li className='list-unstyled ms-3' >{isAuthenticated ? <Link className='text-decoration-none text-white' onClick={userLogoutHandler} >Logout</Link> :  <Link className='text-decoration-none text-white' to='/login' >Login</Link>}</li>
            <li className='list-unstyled ms-3' ><Link className='text-decoration-none text-white' to='/contact' >Contact</Link></li>
            <li className='list-unstyled ms-3' ><Link className='text-decoration-none text-white' to='/cart' >Wish list</Link></li>

        </ul>
    </div>
  )
}

export default Header;