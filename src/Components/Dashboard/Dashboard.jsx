
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';


const Dashboard = () => {

   const API = 'https://the-techie-crud.onrender.com';
  


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [filtering, setFiltering] = useState(false);


  

  const [searchedProducts, setSearchedProducts] = useState([])


  const searchHandler = (event) => {

    setSearchedProducts(products.filter((item) => (item.name).toLowerCase().includes((event.target.value).toLowerCase())))
  }


  const filterProducts = (e) => {
    
    if(e.target.value === 'asc'){

      const asc = products.sort((a, b) => a.price - b.price);

      setProducts(asc);
      setFiltering(!filtering)
    } else {

      const dsc = products.sort((a, b) => b.price - a.price)
      setProducts(dsc);
      setFiltering(!filtering)
    }
  }




  useEffect(() => {

    const token = JSON.parse(localStorage.getItem('token'))

    const getProducts = async () => {
      try{

        setLoading(true)

        const productsData = await axios.get(`${API}/products`, 
          {
             headers: { authorization : `Bearer ${token?.token}` } 
          });

          if(productsData.data){
            setLoading(false)
            setProducts(productsData.data);
          }

      }catch(err){
        console.log(err);
        setLoading(false)
      }
    }

    getProducts();


  },[]);


  const allProducts = searchedProducts.length ? searchedProducts : products;


  const productsItems = allProducts.map((product, index) => {
    return(
      <div key={index} className='border border-secondary rounded w-25 text-center m-1' >
        <img height={150} src={product.image} alt="image" />
        <h4>Name : {product.name}</h4>
        <h4>Price : &#8377;{product.price}</h4>
        
        <Link className='btn btn-primary m-1' to={{ pathname: `/product/${product._id}` }}  >View</Link>
      </div>
    )
  })



  return (
    <div>
      <div className='w-50 m-auto' >
        <input onChange={searchHandler} type="text" placeholder='Search your product....' className='form-control mt-2' />
        <select onChange={filterProducts} className='form-control mt-2'  >
          <option value="">Filter the products by price</option>
          <option value="asc">Low to High</option>
          <option value="dsc">High to low</option>
        </select>
      </div>
      <div style={styles} >
        {loading && <Spinner  variant='dark' /> }
      </div>
        <div className='d-flex flex-wrap justify-content-center mt-4' >
          {productsItems}
        </div>
    </div>
  )
}


const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-55%, -55%)',
}

export default Dashboard