
import express from 'express'
import { ruruHTML } from 'ruru/server'
import { createSchema, createYoga } from 'graphql-yoga'
import { schema } from './src/graphql/index.js'
const app = express();

const yoga = createYoga({
    schema,
})


app.all('/graphql', yoga)

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})


app.listen(4000)
console.log('Api running on : http://localhost:""')