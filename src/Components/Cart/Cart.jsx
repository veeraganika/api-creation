import React from 'react'

const Cart = ({ cart }) => {

    const items = cart.filter((cart) => Boolean(cart)).map((cartItem, index) => {
        return(
            <>
            <div className='d-flex align-items-center justify-content-between' key={index} >
                <img height={100} src={cartItem.image} alt="" />
                <h5>Name : {cartItem.name}</h5>
                <h5>Price: &#8377; {cartItem.price}</h5>
            </div>
            <hr />
            </>
        )
    })

  return (
    <div>
        {items}

        <div className='text-end me-5' >
            <h1>Total: &#8377; {cart.reduce((acc, itemPrice) => acc + itemPrice.price , 0)}</h1>
        </div>
    </div>
  )
}

export default Cart;
