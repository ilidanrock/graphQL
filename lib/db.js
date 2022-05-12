'use strict'
const { MongoClient ,ServerApiVersion } = require("mongodb")
require('dotenv').config()

const {DB_NAME , DB_PORT , DB_HOST, DB_PASSWD, DB_USER} = process.env


const URI = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

let connection

async function connectDB() {
    if(connection) return connection 
    
    try {
        const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        connection =client.db(DB_NAME)
    } catch (error) {
        console.error('Could not connect', URI , error)
        process.exit(1)
    }
    return connection
}

module.exports ={
    connectDB
}