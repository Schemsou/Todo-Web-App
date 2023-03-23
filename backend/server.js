const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
connectDB();
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: "false",
  })
);
app.use("/api/todos", require("./routes/todoRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
