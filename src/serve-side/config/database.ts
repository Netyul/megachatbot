import config from'../knexfile';
import database from 'knex';

const db = database(config);

export default db;