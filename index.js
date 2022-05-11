"use strict";

const { graphql, buildSchema } = require("graphql");
const express = require("express")
var { graphqlHTTP } = require('express-graphql');


const app = express()
const port = process.env.PORT || 3000

//definiendo el esquema

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

//Configurar los resolvers

const resolvers = {
  hello: () => {
    return "Hello Mom";
  },
};
// Ejecutar el Schema

graphql({
  schema: schema,
  source: "{hello}",
  rootValue: resolvers,
})
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, ()=>{
  console.log(`Server is listening at http://localhost:${port}/api`);
})