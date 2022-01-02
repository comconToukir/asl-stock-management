import React from 'react';
import ProductDataService from "../../services/GetProduct";
import { Link, useParams, useLocation } from "react-router-dom";

const Stock = () => {
  const location = useLocation();
  const { key, stock } = location.state;
  console.log(key, stock)
  return (
    <div>
      Stock
    </div>
  );
};

export default Stock;