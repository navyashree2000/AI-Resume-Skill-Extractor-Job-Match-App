require('dotenv').config(); // at the top of your file

const { Pool } = require('pg');
console.log('PG_URI:', process.env.PG_URI);

const pool = new Pool({
  connectionString: process.env.PG_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
