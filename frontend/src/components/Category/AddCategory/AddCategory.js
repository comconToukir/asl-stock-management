import React, { useState, useEffect } from 'react';
import ProductDataService from "../../../services/GetProduct"
import { Link } from 'react-router-dom';

const AddCategory = () => {
  const [ inputCategory, setInputCategory ] = useState("");
  const [ inputData, setInputData ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);

  useEffect(() => {
    setInputData({
      categoryName: inputCategory
    });
    
  }, [inputCategory])

  const onChangeCategory = e => {
    const newCategory = e.target.value;
    setInputCategory(newCategory);
  }

  const createCategory = () => {
    setInputData({
      categoryName: inputCategory,
    });
    console.log(inputData);
    ProductDataService.addCategory(inputData)
    .then(response=>{
      setSubmitted(true);
    });
  }

  return (
    <div className='container'>
      {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/categories"} className="btn btn-success">
              Back to Category
            </Link>
          </div>
        ) : (
        <>
          <div className='input-group d-flex pb-1'>
            <div className="d-flex w-100  justify-content-around">
              <strong>Category: </strong>
              <input
                type="text"
                className='form-control w-50'
                onChange={onChangeCategory}
                required
                />
              <button 
                className='btn btn-success'
                onClick={()=>createCategory()}
              >
                Add Category
              </button>
            </div>
          </div>
        </>
         )
      }
    </div>
  );
}
export default AddCategory;