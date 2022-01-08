import React, { useState, useEffect } from 'react';
import ProductDataService from "../../../services/GetProduct";
import { Link } from "react-router-dom";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    retrieveCompanies();
  }, []);

  const retrieveCompanies = () => {
    ProductDataService.getCompanies()
      .then(response => {
        setCompanies(response.data);
      })
      .catch(e => {
        console.log(e)
      });
  };

  const printDiv = () => {
    window.print();
  } 

  return (
    <div className='container'>
      <div className='row w-25 mx-auto button-div'>
        <Link 
          className='btn btn-outline-secondary mb-3'
          to={"/add-company"}
          >
            Add Company
        </Link>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={printDiv}
          >
            Print Company List
          </button>
        </div>
      <div className='row' id="printableArea">
      <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" width="70%">Company</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company, i) => {
              return (
                <>
                  <tr>
                    <th scope="row">{i+1}</th>
                    <td width="70%">{company.companyName}</td>
                    <td>
                    <Link 
                      to={`/company/${company._id}`} 
                      className="btn btn-outline-secondary button-div"
                      state={company}
                      >
                      Update
                    </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyList;