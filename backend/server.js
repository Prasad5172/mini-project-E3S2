require("dotenv").config({ path: '../.env' })
const  express = require('express');
const  cors = require('cors')
const PORT = process.env.PORT || 8000;
const app = express();
require("./db/conn")

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, 
  }));
  

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.listen(PORT,() => {
    console.log(`server is running at the port no ${PORT}`)
})