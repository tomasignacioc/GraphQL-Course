'use strict'

const { MongoClient } = require('mongodb')
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
} = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
let database

async function connectDB() {
    if (database) return database

    try {
        await client.connect();

        database = client.db(DB_NAME)

    } catch (error) {
        console.log('Could not connect to db', error);
        process.exit(1)
    }

    return database
}

module.exports = connectDB;