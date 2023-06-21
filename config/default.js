
module.exports = {
  postgres: {
    host: 'postgres',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'db',
    schema: 'public',
    synchronize: false,
  },
  
  port: {
    http: 3000,
  },

  redis: {
    host: 'redis',
    port: 6379,
    db: 0,
    password: '',
  },

};
