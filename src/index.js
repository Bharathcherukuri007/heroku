const express =require("express")
const app =express()

const mongoose = require("mongoose")

const url = `mongodb+srv://bharath:bharath@cluster0.ugwez.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  
})

const Person = mongoose.model('Person', personSchema)



app.get("/",(req,res) =>{

  res.send("hloo");

})
app.get("/info",(req,res) =>{
  Person.find({})
    .then(people => people ? people.length : 0)
    .then(entries => {
      const currentTime = new Date()
      const text = `
        <p>Phonebook has info for ${entries} people</p>
        <p>${currentTime}</p>
      `
      res.send(text)
    })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(personToRemove => {
      personToRemove ? res.status(204).end() : res.status(404).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'missing name or number' })
  }

  const person = new Person({
    name,
    number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  const person = {
    name,
    number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'requested resource cannot be found' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error('Error:', error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

app.listen("3001" ,() =>{
  console.log("connected");

})