import React, { useState, useEffect } from 'react';
import ProductDataService from "../../services/GetProduct";
import { Link } from "react-router-dom";
import Product from '../Product/Product';

const ProductsList = (props) => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchSeller, setSearchSeller] = useState("");
  const [categories, setCategories] = useState(["All Categories"]);
  const [sellers, setSellers] = useState(["All Companies"]);

  useEffect(() => {
    retrieveProducts();
    retrieveCategories();
    retrieveSellers();
  }, []);
  
  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  }

  const onChangeSearchCategory = e => {
    const searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  }
  
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

  const retrieveCategories = () => {
    ProductDataService.getCategories()
      .then(response => {
        console.log(response.data);
        setCategories(["All Categories"].concat(response.data));
      })
      .catch(e => {
        console.log(e)
      });
  };

  const retrieveSellers = () => {
    ProductDataService.getSellers()
      .then(response => {
        console.log(response.data);
        setSellers(["All Companies"].concat(response.data));
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

  const findByName = () => {
    find(searchName, "name")
  };

  const findByCategory = () => {
    if (searchCategory === "All Categories") {
      refreshList();
    } else {
    find(searchCategory, "category");
    }
  };

  const findBySeller = () => {
    if (searchSeller === "All Companies") {
      refreshList();
    } else {
      find(searchSeller, "seller");
    }
  }

  return (
    <div className='container'>
      <div className="d-flex flex-column align-items-center pb-1">
        <div className='input-group w-50 col-lg-4 pb-1'>
          <input
            type="text"
            className='form-control'
            placeholder='Search By Name'
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className='input-group-append'>
            <button 
              className='btn btn-outline-secondary'
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>

        <div className='input-group w-50 col-lg-4 pb-1'>
          <input
            type="text"
            className='form-control'
            placeholder='Search By Category'
            value={searchCategory}
            onChange={onChangeSearchCategory}
          />
          <div className='input-group-append'>
            <button 
              className='btn btn-outline-secondary'
              type="button"
              onClick={findByCategory}
            >
              Search
            </button>
          </div>
        </div>

        <div className='input-group w-50 col-lg-4 pb-1'>
          <input
            type="text"
            className='form-control'
            placeholder='Search By Company'
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
          <select onChange={onChangeSearchCategory}>
            {
              categories.map(category => {
                return (
                  <option value={category}> {category} </option>
              )
              })
            }
          </select>
          <div className='input-group-append'>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCategory}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group w-50 col-lg-4 pb-1">
          <select onChange={onChangeSearchSeller}>
            {
              sellers.map(seller => {
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

export default ProductsList;