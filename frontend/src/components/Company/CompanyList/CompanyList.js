import React, { useState, useEffect } from 'react';
import ProductDataService from "../../../services/GetProduct";
import { Link } from "react-router-dom";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // retrieveProducts();
    retrieveCompanies();
    // retrieveSellers();
  }, []);

  const retrieveCompanies = () => {
    ProductDataService.getCompanies()
      .then(response => {
        console.log(response.data);
        setCompanies(response.data);
        // setCompanies(["All Companies"].concat(response.data));
      })
      .catch(e => {
        console.log(e)
      });
  };

  return (
    <div className='container'>
      <div className='d-flex'>
        <Link 
          className='btn btn-outline-secondary w-25 mb-3 mx-auto'
          to={"/add-company"}
          >
            Add Company
        </Link>
      </div>
      <div className='row'>
      <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              {/* <th scope="col">Name</th> */}
              <th scope="col">Company</th>
              {/* <th scope="col">Seller</th> */}
              {/* <th scope="col">Price</th> */}
              {/* <th scope="col">Stock</th> */}
              {/* <th scope="col"></th> */}
            </tr>
          </thead>

          <tbody>
            {companies.map((company, i) => {
              return (
                <>
                  <tr>
                    <th scope="row">{i+1}</th>
                    <td>{company.companyName}</td>
                    <td>
                    <Link 
                      to={`/company/${company._id}`} 
                      className="btn btn-outline-primary"
                      state={company}
                      >
                      Edit
                    </Link>
                    </td>
                    {/* <td>{product.company}</td>
                    <td>{product.seller}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td> */}
                    {/* <td>
                    <Link to={`/product/${product.key}`} className="btn btn-primary">
                      View
                    </Link>
                    </td>
                    <td>
                    <Link 
                      className='btn btn-warning'
                      to={"/product/"+product.key+"/edit"}
                      state= {product}
                      >
                        Edit
                    </Link>
                    </td> */}
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