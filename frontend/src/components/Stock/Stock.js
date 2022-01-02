import React, { useState, useEffect } from 'react';
import ProductDataService from "../../services/GetProduct";
import { Link, useParams, useLocation } from "react-router-dom";

const Stock = () => {
  const location = useLocation();
  const { key, stock } = location.state;
  // const [ productKey, setProductKey ] = useState(key);
  const [ changedStockIn, setChangedStockIn ] = useState(0);
  const [ changedStockOut, setChangedStockOut ] = useState(0);
  const [ availableStock, setAvailableStock ] = useState(parseInt(stock));
  const [ inputData, setInputData ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);

  const onChangeStockIn = (e) => {
    const newStock = parseInt(e.target.value);
    if (newStock > 0) {
      setAvailableStock(availableStock + newStock);
      setChangedStockIn(newStock);
    } else {
      return;
    }
  }
  const onChangeStockOut = (e) => {
    const newStock = parseInt(e.target.value);
    if (newStock > availableStock || newStock < 0) {
      return;
    } else if (newStock > 0) {
      setAvailableStock(availableStock - newStock);
      setChangedStockOut(newStock);
    }
  }

  useEffect(() => {
    setInputData({
      key: key,
      stockIn: changedStockIn,
      stockOut: changedStockOut,
      availableStock: availableStock,
    });
  }, [key, changedStockIn, changedStockOut, availableStock])

  const updateData = () => {
    console.log(inputData);
    ProductDataService.updateStock(inputData)
    .then(response=>{
      setSubmitted(true);
    });
  }
  
  return (
    <div>
      <div className="d-flex">
        <strong>Key: </strong>
        <input
          type="text"
          className='form-control ms-3 mb-3'
          value={ key }
          disabled
          />
      </div>
      <div className="d-flex">
        <strong >Available Stock: </strong>
        <input
          type="number"
          className='form-control ms-3 mb-3'
          value={ availableStock }
          disabled
          />
      </div>
      <div className="d-flex">
        <strong>Stock In: </strong>
        <input
          type="number"
          className='form-control ms-3 mb-3'
          // value={changedPrice}
          onBlur={onChangeStockIn}
          required
          />
      </div>
      <div className="d-flex">
        <strong>Stock Out: </strong>
        <input
          type="number"
          className='form-control ms-3 mb-3'
          // value={changedPrice}
          onBlur={onChangeStockOut}
          required
          />
      </div>
      <button 
        className="btn btn-primary m-1"
        onClick={updateData}
        >Submit</button>
    </div>
  );
};

export default Stock;