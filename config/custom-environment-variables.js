module.exports = {
  timescale: {
    host: 'TIMESCALE_HOST',
    port: {
      __name: 'TIMESCALE_PORT',
      __format: 'json',
    },
    username: 'TIMESCALE_USER',
    password: 'TIMESCALE_PASSWORD',
    database: 'TIMESCALE_DB',
    schema: 'TIMESCALE_SCHEMA',
  },

  mongo: {
    host: 'MONGO_HOST',
    port: {
      __name: 'MONGO_PORT',
      __format: 'json',
    },
    username: 'MONGO_USERNAME',
    password: 'MONGO_PASSWORD',
    database: 'MONGO_DATABASE',
  },

  server: {
    port: 'SERVER_PORT',
  },

  redis: {
    host: 'REDIS_HOST',
    port: {
      __name: 'REDIS_PORT',
      __format: 'json',
    },
    db: {
      __name: 'REDIS_DB',
      __format: 'json',
    },
    password: 'REDIS_PASSWORD',
  },

};
