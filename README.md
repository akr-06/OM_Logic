### Introduction 
* This project is about design and implemention of a backend service for wallet and purchase system with the following features:
    - Setup Wallet
    - Get Wallet Details
    - Add credit to wallet
    - Product Listing 
    - Make a purchase
    - List transaction history

### Installation Guide 
* Clone the repository using the https link
* Open the folder into your editor (Visual Studio Code prefered) 
* Create a .env file in the root folder. Inside the file initialize PORT variable and MONGO_URL.
* For MONGO_URL follow the below steps:
    * Search MongoDb Atlas in google
    * create an account 
    * Go to Database section -> click on connect -> select connect your application -> copy the URL 
    * Assign the copied URL to MONGO_URL
    * Make sure to add your password in the connection string and database name
* Run npm install to install all dependencies

### Setup Basic Express Server
* import express and assign to variable
* import PORT using process.env.PORT
* setup a function to spin up the server

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
    - walletId { type : Schema.Types.ObjectId, ref : 'Wallet' }

### Setup controller folder and implement all the logic
* We have following controllers:
    - setupWallet
    - walletDetails
    - addCreditToWallet
    - getAllProduct
    - purchaseProduct
    - getAllTransaction

    # setupWallet
    - The function attempts to create a new wallet object using data from the req.body object. 
    - The balance field of the new wallet object is set to the value of req.body.balance, rounded to 4 decimal places.
    - A payload object is created with balance and name properties, which is passed to the Wallet.create() method to create a new wallet. 

    # walletDetails
    - The function attempts to retrieve details of a wallet object using the _id passed in the req.params object. 
    - The findOne() method of the Wallet model is used to find the wallet object with the matching _id.
    - If the wallet is found, the function sends a 200 status code along with the details of the wallet object as the response to the client.

    # addCreditToWallet
    - The function attempts to add credit to a specific wallet object using the _id passed in the req.params object.
    - The function starts a MongoDB session and a transaction, which allows multiple operations to be executed as a single transaction. This ensures that if any of the operations fail, all the previous operations are rolled back.
    - The function then uses the findOne() method of the Wallet model to find the wallet object with the matching _id.
    - The wallet object is then saved using the save() method. A new transaction object is created using the information from the req.body and the wallet object. The transaction object is then saved using the save() method and passed the session as an option. The transaction is then committed.
    - If there is any error, the transaction is rolled back using the abortTransaction() method and the session is closed. 
    - If everything is successful, it sends a 200 status code along with the details of the updated wallet object as the response to the client.

    # getAllProducts
    - The function attempts to retrieve all the products from the Product collection in the database.
    - It uses the find() method of the Product model to find all the products in the collection.

    # purchaseProduct
    - The function attempts to purchase a product by deducting the amount of the product from a specific wallet object.
    - Then it starts a MongoDB session and a transaction, which allows multiple operations to be executed as a single transaction. This ensures that if any of the operations fail, all the previous operations are rolled back.
    - The function then uses the findOne() method of the Product and Wallet model to find the product and wallet object with the matching productId and walletId respectively. 
    - The wallet object's balance is then decreased by the amount of the product and rounded to 4 decimal places and converted into a number. The wallet object is then saved using the save() method. 
    - A new transaction object is created using the information from the req.body and the wallet object. The transaction object is then saved using the save() method and passed the session as an option. The transaction is then committed.
    - If there is any error, the transaction is rolled back using the abortTransaction() method and the session is closed.

    # getAllTransaction 
    - The function attempts to retrieve all the transaction from the Transaction collection in the database based on specific walletId.
    - It uses the find() method of the Transaction model to find all the transactions in the collection based on the walletId. 
    - Pagination has been implemented using skip and limit to retrieve a specific page and limit of data.





