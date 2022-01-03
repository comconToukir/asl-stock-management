import React, { useState, useEffect } from 'react';
import ProductDataService from "../../../services/GetProduct"
import { Link } from 'react-router-dom';

const AddCompany = () => {
  const [ inputCompany, setInputCompany ] = useState("");
  const [ inputData, setInputData ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);

  useEffect(() => {
    setInputData({
      companyName: inputCompany
    });
    
  }, [inputCompany])

  const onChangeCompany = e => {
    const newCompany = e.target.value;
    setInputCompany(newCompany);
  }

  const createCompany = () => {
    setInputData({
      companyName: inputCompany,
    });
    console.log(inputData);
    ProductDataService.addCompany(inputData)
    .then(response=>{
      setSubmitted(true);
    });
  }

  return (
    <div className='container'>
      {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/companies"} className="btn btn-success">
              Back to Company
            </Link>
          </div>
        ) : (
        <>
          <div className='input-group d-flex pb-1'>
            <div className="d-flex w-100  justify-content-around">
              <strong>Company: </strong>
              <input
                type="text"
                className='form-control w-50'
                onChange={onChangeCompany}
                required
                />
              <button 
                className='btn btn-success'
                onClick={()=>createCompany()}
              >
                Add Company
              </button>
            </div>
          </div>
        </>
         )
      }
    </div>
  );
}
export default AddCompany;