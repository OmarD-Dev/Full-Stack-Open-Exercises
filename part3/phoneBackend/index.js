require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('postData', (req) => JSON.stringify(req.body))
app.use(
  morgan((tokens, req, res) => {
    const method = tokens.method(req, res)
    const url = tokens.url(req, res)
    const status = tokens.status(req, res)
    const responseTime = tokens['response-time'](req, res)
    const contentLength = tokens.res(req, res, 'content-length')
    const bodyData = tokens.postData(req, res)

    return `${method} ${url} ${status} ${responseTime} ms - ${contentLength} - Body: ${bodyData}`
  })
)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.get('/', (request, response) => {
  response.send('<h1>PhoneBook</h1>')
})
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})
app.get('/api/info', (request, response) => {
  Person.countDocuments({})
    .then((entries) => {
      const date = new Date()
      response.send(`<p>Phonebook has info for ${entries} people</p>
        <p>${date}</p>`)
    })
    .catch((error) => {
      console.error('Error retrieving count:', error)
      response.status(500).send('Error retrieving count')
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })
  newPerson
    .save()
    .then((savedNewPerson) => {
      response.json(savedNewPerson)
    })
    .catch((error) => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
