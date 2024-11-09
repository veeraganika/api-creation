
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import { FcLike } from "react-icons/fc";
import { BiSolidDislike } from "react-icons/bi";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';


import { jwtDecode } from 'jwt-decode'

const ProductInfo = ({ addToCart }) => {


  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);


  sessionStorage.setItem("Hello", JSON.stringify('23454564545'))

 const options = (amount) => {
  return {
    "key" : 'rzp_test_GHqJHD4DXabY3z',
    "amount": amount * 100,
    "currency": "INR",
    "description": "E-commerce",
    "handler": function (response) {
      if(response.razorpay_payment_id){
        return navigate('/Checkout', { state:  favorite} )
      }
    },
  }
 }

  const API = 'https://the-techie-crud.onrender.com';

  const [updated, setUpdated] = useState(null)

  const [like, setLike] = useState(false)

  const [favorite, setFavorite] = useState([])
 
  const token = JSON.parse(localStorage.getItem('token'));

  const [commentAdded, setCommentAdded] = useState(null);


  const [added, setAdded] = useState(false);

  const [addRating, setAddRating] = useState({
    rating: '',
    comment : '',
    user: ''
  })


    const params = useParams();


    const { userId } = jwtDecode(token.token);


    let isCommented;

    const ratings = favorite.ratings?.map((rating, index) => {

       isCommented = rating.user 
      return(
        <div key={index} >
          <h4>Rating : {rating.rating}</h4>
          <hr />
          <p>Comment : {rating.comment}</p>
        </div>
      )
    })



    useEffect(() => { 


      const getProduct = async () => {

      const data = await axios.get(`${API}/single-product/${params.id}`, {
        headers: { authorization : `Bearer ${token.token}` }
      });

      if(data.data){

        setFavorite(data.data)
      }

      }

      getProduct();

    }, [updated, commentAdded]);


   
    const buyNowHandler = (price) => {
      
      const razopay = new window.Razorpay(options(price));

      razopay.open()
    }

    const updateLike = async () => {
      const data = await axios.put(`${API}/product-favorite/${favorite._id}`,{ 
        isFavorite: like  }, {
        headers: { authorization : `Bearer ${token.token}` }
      })
      setLoading(false)
      return setUpdated(data.data.isFavorite);
    }



    const updateFavorite = () => {

      setLike(!like);
      setLoading(true)
      return updateLike(like)
     
    }


    const updateRating = (event) => {


      const {name, value} = event.target;

      setAddRating({
        ...addRating,
        user: userId,
        [name] : value
      })


    }



    const addRatingByuser = async () => {
      
      try{

        const data = await axios.put(`${API}/add-rating/${params.id}`, addRating);

        if(data.data){
          setCommentAdded(data.data?.ratings?.length);
          toast.success("Rating added succesfully....")
        }

        
      }catch(error){
        console.log(error)
      }
    }


    const addToCartHandler = () => {
      addToCart(favorite);
      setAdded(true)
      toast.success("Item added to cart")
    }



  return (
    <>
    <div style={styles.positions} >
      {loading && <Spinner variant='danger'/>}
    </div>
    <div className='text-center pt-5 shadow w-50 m-auto bg-secondary text-white rounded'  >
        <div className='d-flex justify-content-around align-' >

         { favorite?.isFavorite ? <FcLike  size={35} onClick={updateFavorite} alt='icon' /> : <BiSolidDislike  onClick={updateFavorite} size={35}  alt='icon' /> }
      <img size={35} src={favorite?.image} alt="Product" />
      </div>
       <div>
            <h1 className='mt-3 text-dark' >Name: {favorite?.name}</h1>
            <h3 className='mt-3  text-white' >Category: {favorite?.category}</h3>
            <h3 className='mt-3 text-dark' >Price :&#8377; {favorite?.price}</h3>

            
            <div>
                <button className='btn btn-outline-primary' onClick={() => buyNowHandler(favorite?.price)} >BuyNow</button>
                <button className='btn btn-outline-warning m-3' onClick={addToCartHandler} >{ added ? 'Added to wish list' : 'Add to wish list' }</button>
            </div>
       </div>

       <div>
        <input name='rating'  onChange={updateRating} className='form-control w-25' style={styles.inputs}  type="number" placeholder='Rating in number...' min={1}  max={5}  />
        <input name='comment' onChange={updateRating} className='form-control w-25' style={styles.inputs}  type="text" placeholder='Enter your comment on product...' />
        <button disabled={isCommented === userId} className='btn btn-success m-2' onClick={addRatingByuser} >Add</button>
       </div>
    </div>
    <div  >
    <div style={styles.rating} >
        {ratings?.length ? ratings : <h1>No ratings</h1>  }
    </div>
    </div>
    </>
  )
}


const styles = {
  positions : {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-55%, -55%)',
  },
  inputs: {
    margin : '15px auto'
  },

  rating : {
    marginTop: "25px",
    height: "130px",
    border: '1px solid gray',
    textAlign: 'center',
    borderRadius: '10px',
    margin: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  }
}

export default ProductInfo;
