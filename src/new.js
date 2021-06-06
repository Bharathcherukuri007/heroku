const Person = require('./person')



const mongoose = require('mongoose')


const { response } = require("express")
const express =require("express")
const app =express()


app.get("/" ,  (req,res) =>{
    res.send("hello" )
})

app.get("/info", async(res,req) =>{



  await Person.countDocuments({}).then((count) => {
    const messageContent = `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`
   
  })
})


app.listen("3001", () => console.log(`Server is running on port 3001`))