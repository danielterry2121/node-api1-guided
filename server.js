//this import is now pulling from node_modules instead of node stdLib
const express = require("express")
const db = require("./database.js")

//instantiate an express server instance
const server = express()

//express has a router set up
server.get("/",(req,res) => {
    res.json({ message: "Hello , World"})
})
server.get("/users", (req,res) => {
    //simulate a real call to a database to fetch data
    const users = db.getUsers()
    //return this "fake" data to the client
    res.json(users)
})
//route params :
server.get("/users/:id", (req,res) => {
    const id = req.params.id
    const user = db.getUserById(id)
    //make sure user exist before we try to send it back
    if(user) {
    res.json(user)
    } else {
        res.status(404).json({
            message:"User not found",
        })
    }
})

server.post("/users" , (req,res) => {
    const newUser = db.createUser({
        name:"Bob doe",
    })
    //status code for something created
    res.status(201).json(newUser)
})
//servers need to be continuously listening
server.listen(8080, () => {
    console.log("server started")
})