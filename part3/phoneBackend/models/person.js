const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDb')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^([0-9]{2,3})-([0-9]+)$/.test(value)
      },
      message:
        'Invalid phone number format. Please use the correct format (e.g., 09-12345678).',
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Person', personSchema)
