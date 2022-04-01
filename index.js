const {PORT = 3000} = process.env;
const express = require ('express');
const server = express();
const morgan = require('morgan')
const cors = require('cors')
const {client} = require('./db')

// Use the dotenv package, to create environment variables

require('dotenv').config();
client.connect();
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000

// Import express, and create a server

// Require morgan and body-parser middleware

// Have the server use morgan with setting 'dev'

// Import cors 
// Have the server use cors()

// Have the server use bodyParser.json()

// Have the server use your api router with prefix '/api'
const apiRouter = require('./api')
server.use("/api", apiRouter)
// Import the client from your db/index.js


server.use((error, req, res, next) => {
res.status(404).send("Error this page doesn't exist");
 });
// Create custom 404 handler that sets the status code to 404.
server.use((error, req, res, next)=> {
    res.status(500).send({error})
    console.log(error, "500 error")
})
// Create custom error handling that sets the status code to 500
// and returns the error as an object


// Start the server listening on port PORT
// On success, connect to the database
server.listen(PORT, () => {
    console.log("the server is running", PORT);
  });