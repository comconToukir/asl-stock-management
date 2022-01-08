import React, { useState, useEffect } from 'react';
import ProductDataService from "../../services/GetProduct";


const Home = () => {
  const [ categoryList, setCategoryList ] = useState([])
  const [ companyList, setCompanyList ] = useState([])
  const [ itemList, setItemList ] = useState([])
  const [ stockList, setStockList ] = useState([])

  useEffect(() => {
    ProductDataService.getCategories()
      .then((res) => {
        console.log(res.data)
        setCategoryList(res.data);
      })
      .catch((e) => {
        console.log(e)
      });

    ProductDataService.getCompanies()
      .then((res) => {
        console.log(res.data)
        setCompanyList(res.data);
      })
      .catch((e) => {
        console.log(e)
      });

    ProductDataService.getProducts()
      .then((res) => {
        console.log(res.data)
        setItemList(res.data);
      })
      .catch((e) => {
        console.log(e)
      });

      const range = {
        greaterThan: new Date("1999-01-01").toISOString(),
        lesserThan: new Date().toISOString()
      }
    ProductDataService.getStock(range)
      .then((res) => {
        console.log(res.data)
        setStockList(res.data);
      })
      .catch((e) => {
        console.log(e)
      });
  }, [])

  return (
    <>
      <div className='row justify-content-around g-5'>
        <div className="card" style={{width: "18rem", padding: "0px"}}>
          <div className="card-header">
            Categories
          </div>
          <ul className="list-group list-group-flush" style={{ height: "204px", overflow: "auto", overflowX: "hidden"}}>
            {
              categoryList.map((cat) => {
                return <li className="list-group-item">{cat.categoryName}</li>
              })
            }
          </ul>
        </div>

        <div className="card" style={{width: "18rem", padding: "0px"}}>
          <div className="card-header">
            Companies
          </div>
          <ul className="list-group list-group-flush" style={{ height: "204px", overflow: "auto", overflowX: "hidden"}}>
            {
              companyList.map((com) => {
                return <li className="list-group-item">{com.companyName}</li>
              })
            }
          </ul>
        </div>

        <div className="card" style={{width: "18rem", padding: "0px"}}>
          <div className="card-header">
            Items
          </div>
          <ul className="list-group list-group-flush" style={{ height: "204px", overflow: "auto", overflowX: "hidden"}}>
            { itemList.products &&
              itemList.products.map((it) => {
                return <li className="list-group-item">{it.name}</li>
              })
            }
          </ul>
        </div>
      </div>

      <div className="mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Company</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>yyyy-mm-dd</th>
            </tr>
          </thead>
          <tbody>
            { stockList.products &&
              stockList.products.slice(0, 5).map((st, i)=> {
                return <>
                <tr>
                <td>{i+1}</td>
                  <td>{st.name}</td>
                  <td>{st.categoryName}</td>
                  <td>{st.companyName}</td>
                  {st.stockOut &&
                    <>
                      <td>Stock Out</td>
                      <td>{st.stockOut}</td>
                    </>
                  } 
                  {st.stockIn &&
                    <>
                      <td>Stock in</td>
                      <td>{st.stockIn}</td>
                    </>
                  }
                  <td>
                    {st.stock_update_date.substr(0, 10)}
                    </td>
                </tr>
                </>
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;