const { Pool, Client } = require('pg')
const dev = require('./devConfig.json')
const connectionString = process.env.DATABASE_URL || dev['db-url']
const pool = new Pool({
  connectionString,
    ssl: {
    rejectUnauthorized: false
  },
})

module.exports = pool;