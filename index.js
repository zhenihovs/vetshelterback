require('dotenv').config()

const express = require("express");
const cors = require("cors");
const router = require('./routes/index')


const app = express();

// Settings
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// Routes

app.use(router);

// handling errors
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
