import React, { useState, useEffect } from 'react';
import ProductDataService from "../../../services/GetProduct"
import { Link, useLocation } from 'react-router-dom';


const EditCompany = () => {
  const location = useLocation();
  const [ inputCompany, setInputCompany ] = useState("");
  const [ inputData, setInputData ] = useState({});
  const [ submitted, setSubmitted ] = useState(false);
  // const [ companyId, setCompanyId ] = useState(location.state._id);

  useEffect(() => {
    setInputData({
      companyId: location.state._id,
    });
  }, []);

  useEffect(() => {
    setInputData({
      companyId: location.state._id,
      companyName: inputCompany
    });
    
  }, [inputCompany, location.state._id])

  const onChangeCompany = e => {
    const newCompany = e.target.value;
    setInputCompany(newCompany);
  }

  const editCompany = () => {
    setInputData({
      companyId: location.state._id,
      companyName: inputCompany,
    });
    ProductDataService.editCompany(inputData)
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
            <div className="d-flex w-100 justify-content-around">
              <strong>Company: </strong>
              <input
                type="text"
                className='form-control w-50'
                onChange={onChangeCompany}
                defaultValue={location.state.companyName}
                required
                />
              <button 
                className='btn btn-outline-secondary'
                onClick={()=>editCompany()}
              >
                Update
              </button>
            </div>
          </div>
        </>
         )
      }
    </div>
  );
}
export default EditCompany;