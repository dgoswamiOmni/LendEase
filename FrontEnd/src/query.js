const { Pool } = require('pg');
// require('dotenv').config();

// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


// Define connection values directly:
const PGHOST = 'ep-proud-morning-a29r7alb-pooler.eu-central-1.aws.neon.tech';
const PGDATABASE = 'Dashboard';
const PGUSER = 'emeraldgreenpower19';
const PGPASSWORD = 'lsILktnSv8u5';

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,

  // ssl: {
  //   require: true,
  // },
});

async function checkCredentials(username, password) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE name = $1 AND password = $2', [username, password]);
    return result.rows.length > 0;
  } finally {
    client.release();
  }
}

export default checkCredentials;
