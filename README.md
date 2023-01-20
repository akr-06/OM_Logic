### Setup Basic Express Server
-  import express and assign to variable
-  setup PORT variable in .env file and import it using process.env.PORT
-  set up a function to spin up the server

### Connect to Database
- Get a connection string to connect to the database from MongoDb Atlas
- create a variable in .env file named MONGO_URL and assign the connection string to this variable
- Make sure to add your password in the connection string and database name

### Setup all the routes
- set up routes 
- GET (/wallet/:walletId), GET (/products), GET (/wallet/:walletId/transaction)
- POST (/wallet), POST (/wallet/:walletId/transaction), POST(/wallet/:walletId/purchase)

### Test all routes in POSTMAN
- test all the routes in postman 

### setup Models
- We have 3 models here
- Product, Transaction, Wallet
## Product Model 
- ProductId { type : mongoose.Schema.Types.ObjectId}
- amount { type : String }
- description { type : String }
## Transaction Model
- balance { type : Number}
- transactionId { type : mongoose.Schema.Types.ObjectId}
- description { type : String}
- type { type : String }
- walletId { type : String }

### Setup controller folder and implement all the logic





