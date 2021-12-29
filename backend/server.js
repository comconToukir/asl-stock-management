import express from "express";
import cors from "cors";
import products from "./api/products.route.js";

const app = express();

app.use(cors());
app.use(express.json()); //dont need body-parser

app.use("/api/v1/products", products)
app.use("*", (req, res) => res.status(404).json({error: "not found"}));

export default app;