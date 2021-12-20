require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const promotionRouter = require("./api/promotions/promotion.router");
const logsRouter = require("./api/logs/log.router");

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/promotions", promotionRouter);
app.use("/api/logs", logsRouter);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
