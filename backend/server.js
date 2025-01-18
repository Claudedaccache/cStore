const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ConnectDb = require("./config/mongodb");
const ConnectCloudinary = require("./config/cloudinary");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const contactUsRouter = require("./routes/contactUsRoute");

const app = express();
const port = process.env.PORT || 4000;

ConnectDb();
ConnectCloudinary();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/contactUs", contactUsRouter);

app.get("/", (req, res) => {
  res.send("API is working");
});

//listen
app.listen(port, (req, res) => {
  console.log(`server is running on port : ${port}`);
});
