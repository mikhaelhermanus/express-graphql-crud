
import express from 'express'
import { ruruHTML } from 'ruru/server'
import { createYoga } from 'graphql-yoga'
import { schema } from './src/graphql/index.js'
import { setupDatabase } from './src/mongo/index.js'
import 'dotenv/config'
const app = express();

const yoga = createYoga({
    schema,
    context: async () => {
        const mongo = await setupDatabase()
        return {
            mongo
        }
    }
})


app.all('/graphql', yoga)

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`Api running on : http://localhost:${PORT}` )