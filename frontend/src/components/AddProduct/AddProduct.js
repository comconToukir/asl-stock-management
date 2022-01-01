import React, { useState } from 'react';
import ProductDataService from "../../services/GetProduct"
import { useLocation } from 'react-router-dom';


const EditProduct = () => {
  const location = useLocation();
  const { key, name, category, seller, price, stock  } = location.state;
  const [ changedKey, setChangedKey ] = useState("");
  const [ changedName, setChangedName ] = useState("");
  const [ changedCategory, setChangedCategory ] = useState("");
  const [ changedSeller, setChangedSeller ] = useState("");
  const [ changedPrice, setChangedPrice ] = useState(0);
  const [ changedStock, setChangedStock ] = useState(0);
  const [ inputData, setInputData ] = useState({});

  const onChangeKey = e => {
    const newKey = e.target.value;
    setChangedKey(newKey);
  }
  const onChangeName = e => {
    const newName = e.target.value;
    setChangedName(newName);
  }
  const onChangeCategory = e => {
    const newCategory = e.target.value;
    setChangedCategory(newCategory);
  }
  const onChangeSeller = e => {
    const newSeller = e.target.value;
    setChangedSeller(newSeller);
  }
  const onChangePrice = e => {
    const newPrice = e.target.value;
    setChangedPrice(newPrice);
  }
  const onChangeStock = e => {
    const newStock = e.target.value;
    setChangedStock(newStock);
  }

  const testRun = () => {
    setInputData({
      "key": changedKey,
      "name": changedName,
      "category": changedCategory,
      "seller": changedSeller,
      "price": changedPrice,
      "stock": changedStock,
    });
    console.log(inputData);
    ProductDataService.updateProduct(inputData);
  }

  return (
    <div>
      <div className='input-group d-flex flex-column pb-1'>
        <div className="d-flex">
          <strong>Key: </strong>
          <input
            type="text"
            className='form-control ms-3 mb-3'
            value={key}
            onChange={onChangeKey}
            />
        </div>
        <div className="d-flex">
          <strong>Name: </strong>
          <input
            type="text"
            className='form-control ms-3 mb-3'
            value={name}
            onChange={onChangeName}
            />
        </div>
        <div className="d-flex">
          <strong>Category: </strong>
          <input
            type="text"
            className='form-control ms-3 mb-3'
            value={category}
            onChange={onChangeCategory}
            />
        </div>
        <div className="d-flex">
          <strong>Seller: </strong>
          <input
            type="text"
            className='form-control ms-3 mb-3'
            value={seller}
            onChange={onChangeSeller}
            />
        </div>
        <div className="d-flex">
          <strong>Price: </strong>
          <input
            type="number"
            className='form-control ms-3 mb-3'
            value={price}
            onChange={onChangePrice}
            />
        </div>
        <div className="d-flex">
          <strong>Stock: </strong>
          <input
            type="number"
            className='form-control ms-3 mb-3'
            value={stock}
            onChange={onChangeStock}
            />
        </div>
      </div>
      <button onClick={()=>testRun()}>show</button>
    </div>
  );
};

export default EditProduct;