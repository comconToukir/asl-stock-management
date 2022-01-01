import React, { useState, useEffect } from 'react';
import ProductDataService from "../../services/GetProduct"
import { Link, useParams, Route, Routes } from "react-router-dom";
import EditProduct from '../EditProduct/EditProduct';

const Product = (props) => {
  let { key } = useParams();
  // console.log(props);
  const initialProductState = {
    key: "",
    name: "",
    category: "",
    seller: "",
    price: 0,
    stock: 0,
  }

  const [product, setProduct] = useState(initialProductState);

  const getProduct = (key) => {
    ProductDataService.get(key)
    .then(response => {
      setProduct(response.data);
      // console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
    getProduct(key);
  }, [key]);

  const deleteProduct = (key) => {
    ProductDataService.deleteProduct(key)
    .then(response => {
      setProduct(initialProductState);
    })
    .catch(e => {
      console.log(e);
    })
  }
  return (
    <div className="container">
      <strong>Key: </strong><span>{product.key}</span><br/>
      <strong>Name: </strong><span>{product.name}</span><br/>
      <strong>Category: </strong><span>{product.category}</span><br/>
      <strong>Seller: </strong><span>{product.seller}</span><br/>
      <strong>Price: </strong><span>{product.price}</span><br/>
      <strong>Stock: </strong><span>{product.stock}</span><br/>
      <div className="d-flex">
      <Link 
        className='btn btn-warning m-1'
        to={"/product/"+product.key+"/edit"}
        state= {product}
        >
          Edit
      </Link>
      <button 
        className="btn btn-danger m-1 ms-auto"
        onClick={()=>deleteProduct(key)}
        >Delete Product</button>
      </div>
    </div>
  );
};

export default Product;