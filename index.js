// Server Dependencies
const express = require('express')
const massive = require('massive')
const path = require('path')

// Middlewares
const { logger_middleware } = require('./middlewares')

// Tell the server where the .env file exist
require('dotenv').config({ path: `${__dirname}/.env` })
// ENV Variables
const { DB_DATABASE, DB_USER, DB_PASSWORD, NODE_ENV } = process.env

const app = express()
const PORT = 3000

// Parse JSON from requests
app.use(express.json())

// Routes
app.use('/api', logger_middleware, require('./routes'))

// Server front-end files to client
app.use(express.static(`${__dirname}/public`))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/public/index.html`))
})

// Start Server
async function startServer() {
  try {
    // Connect to database
    const db_instance = await massive(
      {
        host: 'localhost',
        port: 5432,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD,
        ssl: false,
        poolSize: 10
      },
      { scripts: `${__dirname}/db` }
    )

    // Set the database instance onto app for later access in controllers
    app.set('db', db_instance)

    console.log('Massive successfully connected to', DB_DATABASE)
    console.log('Server running on NODE_ENV', NODE_ENV)

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`))
  } catch (err) {
    console.error('startServer failed in index.js', err)
  }
}

startServer()
