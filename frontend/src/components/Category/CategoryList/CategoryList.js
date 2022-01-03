import React, { useState, useEffect } from 'react';
import ProductDataService from "../../../services/GetProduct";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // retrieveProducts();
    retrieveCategories();
    // retrieveSellers();
  }, []);

  const retrieveCategories = () => {
    ProductDataService.getCategories()
      .then(response => {
        console.log(response.data);
        setCategories(response.data);
        // setCategories(["All Categories"].concat(response.data));
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
          to={"/add-category"}
          >
            Add Category
        </Link>
      </div>
      <div className='row'>
      <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              {/* <th scope="col">Name</th> */}
              <th scope="col">Category</th>
              {/* <th scope="col">Seller</th> */}
              {/* <th scope="col">Price</th> */}
              {/* <th scope="col">Stock</th> */}
              {/* <th scope="col"></th> */}
            </tr>
          </thead>

          <tbody>
            {categories.map((category, i) => {
              return (
                <>
                  <tr>
                    <th scope="row">{i+1}</th>
                    <td>{category.categoryName}</td>
                    <td>
                    <Link 
                      to={`/category/${category._id}`} 
                      className="btn btn-outline-primary"
                      state={category}
                      >
                      Edit
                    </Link>
                    </td>
                    {/* <td>{product.category}</td>
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

export default CategoryList;