import React, { useState, useEffect } from 'react';
import ProductDataService from "../../services/GetProduct";
import { Link } from "react-router-dom";

const Company = () => {
  const [products, setProducts] = useState([]);
  const [searchSeller, setSearchSeller] = useState("");
  const [seller, setSeller] = useState(["All Seller"]);

  useEffect(() => {
    // retrieveProducts();
    retrieveSellers();
    // retrieveSellers();
  }, []);

  const onChangeSearchSeller = e => {
    const searchSeller = e.target.value;
    setSearchSeller(searchSeller);
  }

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then(response => {
        console.log(response.data);
        setProducts(response.data.products);
      })
      .catch (e => {
        console.log(e);
      })
  };

  const retrieveSellers = () => {
    ProductDataService.getSellers()
      .then(response => {
        console.log(response.data);
        setSeller(["All Seller"].concat(response.data));
      })
      .catch(e => {
        console.log(e)
      });
  };

  const refreshList = () => {
    retrieveProducts();
  }


  const find = (query, by) => {
    ProductDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setProducts(response.data.products)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const findBySeller = () => {
    if (searchSeller === "All Seller") {
      refreshList();
    } else {
    find(searchSeller, "seller");
    }
  };


  return (
    <div className='container'>
      <div className="d-flex flex-column align-items-center pb-1">

        <div className='input-group w-50 col-lg-4 pb-1'>
          <input
            type="text"
            className='form-control'
            placeholder='Search By Seller'
            value={searchSeller}
            onChange={onChangeSearchSeller}
          />
          <div className='input-group-append'>
            <button 
              className='btn btn-outline-secondary'
              type="button"
              onClick={findBySeller}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group w-50 col-lg-4 pb-1">
          <select onChange={onChangeSearchSeller}>
            {
              seller.map(seller => {
                return (
                  <option value={seller}> {seller} </option>
              )
              })
            }
          </select>
          <div className='input-group-append'>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findBySeller}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Seller</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, i) => {
              return (
                <>
                  <tr>
                    <th scope="row">{i+1}</th>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.seller}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
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

export default Company;