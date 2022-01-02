import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ProductsDAO from "./dao/productsDAO.js";
import ProductsEditDAO from "./dao/productsEditDAO.js";
import StockUpdateDAO from "./dao/stockUpdateDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
  process.env.PRODUCTS_DB_URI,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.catch(err => {
  console.error(err.stack)
  process.exit(1)
})
.then(async client => {
  await ProductsDAO.injectDB(client)
  await ProductsEditDAO.injectDB(client)
  await StockUpdateDAO.injectDB(client)
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
})