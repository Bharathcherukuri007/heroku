const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = "mongodb+srv://bharath:bharath@cluster0.ugwez.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(error => console.error('DB connect error:', error.message))

// Fix: DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)