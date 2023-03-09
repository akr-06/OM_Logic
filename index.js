const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes/index');

const PORT = process.env.PORT;

//I am just testing
// I did the testing, works fine

const connectDB = require('./db/connect');

app.use(express.json());

app.use('/',routes);

const setupAndStartServer = async () => {

    await connectDB(process.env.MONGO_URL);
    app.listen(PORT,()=>{
        console.log(`Server started at ${PORT}`);
        console.log('new branch')
    })
}

setupAndStartServer();