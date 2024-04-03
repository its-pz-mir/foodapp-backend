const express = require('express')
const app = express()
require('dotenv').config();
const dbConnect = require("./db/index");
const port = process.env.PORT;
const cors = require('cors');
const router = require('./Routes');
const cookieParser = require('cookie-parser');


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);


dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})