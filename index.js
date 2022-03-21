'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs')
const { join } = require('path')

const app = express()
const resolvers = require('./lib/resolvers')
const port = process.env.port || 3000;

// definiendo el esquema

const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf8')
const schema = makeExecutableSchema({typeDefs, resolvers})

// configurar los resolvers


app.use('/api', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server listening in http://localhost:${port}/api`);
})