require('dotenv').config();

import express from 'express'
import { MongoClient } from 'mongodb'
import process from 'process'
import bodyParser from 'body-parser'

const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


MongoClient.connect(`mongodb+srv://transittracker:${process.env.TRACKERPASS}@cluster0.fmdy7xd.mongodb.net/?retryWrites=true&w=majority`)
.then(client => {
    const db = client?.db('busengine')
    const collection = db?.collection('elements')

    // Create new posting
    app.post("/post", (req, res) => {
        collection?.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            }).catch(err => console.log(err))
    })

    // READ from db
    app.get("/", (req, res) => {
        const cursor = collection?.find().toArray()
            .then(result => {
                res.render("index", {result})
            }).catch(err => console.log(err))
    })

    // DELETE from db
    app.delete("/delete", (req, res) => {
        collection?.deleteOne({
            //insertedId is the unique ID mongo uses
            insertedId: req.body.id
        }).then(result => {
            res.json("Bus has been deleted")
        }).catch(err => console.log(err))
    })
    
}).catch((err: ErrorEvent) => console.log(err))




// Start Server
app.listen(PORT, () => {
    console.log(`TS server is running on port ${PORT}`)
})