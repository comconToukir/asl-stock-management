import React, { useEffect, useState } from 'react';
import ProductDataService from "../../services/GetProduct"
import { Link, useLocation } from 'react-router-dom';


const EditProduct = () => {
  const location = useLocation();
  const { key, name, category, seller, price, stock  } = location.state;
  const [ submitted, setSubmitted ] = useState(false);
  const [ changedName, setChangedName ] = useState(name);
  const [ changedCategory, setChangedCategory ] = useState(category);
  const [ changedSeller, setChangedSeller ] = useState(seller);
  const [ changedPrice, setChangedPrice ] = useState(price);
  const [ changedStock, setChangedStock ] = useState(stock);
  const [ inputData, setInputData ] = useState([]);

  useEffect(() => {
    setInputData({
      key: key,
      name: changedName,
      category: changedCategory,
      seller: changedSeller,
      price: changedPrice,
      stock: changedStock,
    });
   
  }, [key, changedName, changedCategory, changedSeller, changedPrice, changedStock])
  
  const onChangeName =(e) => {
    const newName = e.target.value;
    
    setChangedName(newName);
  }
  const onChangeCategory = (e) => {
    const newCategory = e.target.value;
    setChangedCategory(newCategory);
  }
  const onChangeSeller = (e) => {
    const newSeller = e.target.value;
    setChangedSeller(newSeller);
  }
  const onChangePrice = (e) => {
    const newPrice = e.target.value;
    setChangedPrice(newPrice);
  }
  const onChangeStock = (e) => {
    const newStock = e.target.value;
    setChangedStock(newStock);
  }

  const updateData = () => {
    setInputData({
      key: key,
      name: changedName,
      category: changedCategory,
      seller: changedSeller,
      price: changedPrice,
      stock: changedStock,
    });
    console.log(inputData);
    ProductDataService.updateProduct(inputData)
    .then(response=>{
      setSubmitted(true);
    });
  }

  return (
    <div className='container'>
      {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/product/" + key} className="btn btn-success">
              Back to Product
            </Link>
          </div>
        ) : (
        <>
          <div className='input-group d-flex flex-column pb-1'>
            <div className="d-flex">
              <strong>Key: </strong>
              <input
                type="text"
                className='form-control ms-3 mb-3'
                defaultValue={key}
                disabled
                />
            </div>
            <div className="d-flex">
              <strong>Name: </strong>
              <input
                type="text"
                className='form-control ms-3 mb-3'
                defaultValue={name}
                onChange={(e)=>onChangeName(e)}
                />
            </div>
            <div className="d-flex">
              <strong>Category: </strong>
              <input
                type="text"
                className='form-control ms-3 mb-3'
                defaultValue={category}
                onChange={(e)=>onChangeCategory(e)}
                />
            </div>
            <div className="d-flex">
              <strong>Seller: </strong>
              <input
                type="text"
                className='form-control ms-3 mb-3'
                defaultValue={seller}
                onChange={(e)=>onChangeSeller(e)}
                />
            </div>
            <div className="d-flex">
              <strong>Price: </strong>
              <input
                type="number"
                className='form-control ms-3 mb-3'
                defaultValue={parseFloat(price)}
                onChange={(e)=>onChangePrice(e)}
                />
            </div>
            <div className="d-flex">
              <strong>Stock: </strong>
              <input
                type="number"
                className='form-control ms-3 mb-3'
                defaultValue={parseInt(stock)}
                onChange={(e)=>onChangeStock(e)}
                />
            </div>
          </div>
          <button 
            className='btn btn-warning'
            onClick={updateData}
          >
            Submit
          </button>
        </>
        )
      }
    </div>
  );
};

export default EditProduct;