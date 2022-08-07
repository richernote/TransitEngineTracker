require('dotenv').config();

import express from 'express'
import path from 'path'
import { MongoClient } from 'mongodb'
import process from 'process'
const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))


interface Engine {
    busNumber: number;
    engineNumber: number;
}

const engines: Engine[] = [
    {
        busNumber: 9694,
        engineNumber: 5114
    }
    ,
    {
        busNumber: 9466,
        engineNumber: 5002
    }
    ,
    {
        busNumber:  9544,
        engineNumber: 4077
    },
    {
        busNumber: 9607,
        engineNumber: 5655
    }
]

MongoClient.connect(`mongodb+srv://transittracker:${process.env.TRACKERPASS}@cluster0.fmdy7xd.mongodb.net/?retryWrites=true&w=majority`, (err, client) => {
    if(err) return console.error(err)
    console.log('connected to DB')

    const db = client?.db('busengine')
    const collection = db?.collection('elements')

    // Home route
    app.get("/", (req, res) => {
        res.render('index', {
            title: "Transit Engine Tracker",
        })
    })
    
    app.get('/engines', (req, res) => {
        res.send(engines)
    })

    
})




// Start Server
app.listen(3001, () => {
    console.log("TS server is running...")
})