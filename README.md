### Introduction 
* This project is about design and implemention of a backend service for wallet and purchase system with the following features:
    - Setup Wallet
    - Get Wallet Details
    - Add credit to wallet
    - Product Listing 
    - Make a purchase
    - List transaction history

### Installation Guide 
* Run npm install to install all dependencies
* Create an .env file in your project root folder and add your variables such as MONGO_URL and PORT

### Setup Basic Express Server
* import express and assign to variable
* import PORT using process.env.PORT
* setup a function to spin up the server

### Connect to Database
* Get a connection string to connect to the database from MongoDb Atlas
* create a variable in .env file and set a variable named MONGO_URL and assign the connection string to this variable
* Make sure to add your password in the connection string and database name

### Setup all the routes
* set up routes 
    - GET (/wallet/:walletId)
    - GET (/products)
    - GET (/wallet/:walletId/transaction)
    - POST (/wallet)
    - POST (/wallet/:walletId/transaction)
    - POST(/wallet/:walletId/purchase)

### Test all routes in POSTMAN

### setup Models
* We have 3 models here
    - Product
    - Transaction
    - Wallet
* Product Model 
    - ProductId { type : mongoose.Schema.Types.ObjectId}
    - amount { type : String }
    - description { type : String }
* Transaction Model
    - balance { type : Number}
    - transactionId { type : mongoose.Schema.Types.ObjectId}
    - description { type : String}
    - productId { type : String}
    - type { type : String }
    - walletId { type : String }

### Setup controller folder and implement all the logic
* We have following controllers:
    - setupWallet
    - walletDetails
    - addCreditToWallet
    - getAllProduct
    - purchaseProduct
    - getAllTransaction




