import React, { useState, useEffect } from 'react';
import ProductDataService from "../../../services/GetProduct"
import { Link, useLocation } from 'react-router-dom';


const EditCategory = () => {
  const location = useLocation();
  const [ inputCategory, setInputCategory ] = useState("");
  const [ inputData, setInputData ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);
  const [ categoryId, setCategoryId ] = useState(location.state._id);

  useEffect(() => {
    setInputData({
      categoryId: location.state._id,
    });
  }, []);

  useEffect(() => {
    setInputData({
      categoryId: location.state._id,
      categoryName: inputCategory
    });
    
  }, [inputCategory, location.state._id])

  const onChangeCategory = e => {
    const newCategory = e.target.value;
    setInputCategory(newCategory);
  }

  const editCategory = () => {
    setInputData({
      categoryId: location.state._id,
      categoryName: inputCategory,
    });
    // console.log(inputData);
    ProductDataService.editCategory(inputData)
    .then(response=>{
      setSubmitted(true);
    });
  }

  const deleteCategory = () => {
    console.log(inputData)
    ProductDataService.deleteCategory(inputData)
    .then(response => {
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
            <div className="d-flex w-100 justify-content-center mb-3">
              <strong>ID: </strong> <span className="ms-2">{location.state._id}</span>
            </div>
            <div className="d-flex w-100  justify-content-around">
              <strong>Category: </strong>
              <input
                type="text"
                className='form-control w-50'
                onChange={onChangeCategory}
                defaultValue={location.state.categoryName}
                required
                />
              <button 
                className='btn btn-success'
                onClick={()=>editCategory()}
              >
                Edit
              </button>
              {/* <button 
                className='btn btn-danger'
                onClick={()=>deleteCategory()}
              >
                Delete
              </button> */}
            </div>
          </div>
        </>
         )
      }
    </div>
  );
}
export default EditCategory;