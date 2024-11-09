

import React from 'react';

import  { useLocation } from 'react-router-dom'

const CheckOut = () => {


    const { state } = useLocation();


    console.log(state)

  return (
    <div>
        <h1>Hurray..!! Your order is placed successfullly....</h1>

        <div>
            <h1>Ordered Product : {state.name}</h1>
            <h1>Price : {state.price}</h1>
        </div>
    </div>
  )
}

export default CheckOut