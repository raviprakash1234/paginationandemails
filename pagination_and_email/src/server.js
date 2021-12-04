const express = require("express")


const connect = require("./configs/db")

const userController = require("./controllers/user.controller")

const app = require("./index")
app.use(express.json())

app.use("/users", userController)



app.listen(9999, async ()=>{

    await connect()
    console.log("running port 9999")
})