const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes/index');

const PORT = process.env.PORT;

const connectDB = require('./db/connect');

app.use(express.json());

app.use('/',routes);

const setupAndStartServer = async () => {

    await connectDB(process.env.MONGO_URL);
    app.listen(PORT,()=>{
        console.log(`Server started at ${PORT}`);
    })
}

setupAndStartServer();