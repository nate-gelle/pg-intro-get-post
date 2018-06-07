const pg = require('pg');
const Pool = pg.Pool;

const DATABASE_NAME = 'nategelle';
const config = {
    database: DATABASE_NAME,
    host: 'localhost', // where the db is located
    port: 5432, // the port the db is listening on
    max: 10, // max number of connections
    idleTimeoutMillis: 3000 // limit of 30 seconds to connect
}

// Make the db conncection pool
const pool = new Pool(config);

// Log successful connection
pool.on('connect', (client) => {
    console.log(`Connected to database ${DATABASE_NAME} from ${client}`);
})

// Handle errors fro clients that have been idle too long
pool.on('error', (err, client) => {
    console.log(`Error with db connection from ${client}. Error: `, err);
    process.exit(-1);
})

module.exports = pool;