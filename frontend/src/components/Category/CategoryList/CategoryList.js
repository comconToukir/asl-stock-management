import React, { useState, useEffect } from "react";
import ProductDataService from "../../../services/GetProduct";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    retrieveCategories();
  }, []);

  const retrieveCategories = () => {
    ProductDataService.getCategories()
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const printDiv = () => {
    window.print();
  };

  return (
    <div className="container">
      <div className="row w-25 mx-auto button-div">
        <Link
          className="btn btn-outline-secondary mb-3 mx-auto"
          to={"/add-category"}
        >
          Add Category
        </Link>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={printDiv}
        >
          Print Categories
        </button>
      </div>
      <div className="row" id="printableArea">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" width="70%">
                Category
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, i) => {
              return (
                <>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td width="70%">{category.categoryName}</td>
                    <td>
                      <Link
                        to={`/category/${category._id}`}
                        className="btn btn-outline-secondary"
                        state={category}
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

export default CategoryList;
