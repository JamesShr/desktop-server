module.exports = {
  postgres: {
    host: 'POSTGRES_HOST',
    port: {
      __name: 'POSTGRES_PORT',
      __format: 'json',
    },
    username: 'POSTGRES_USER',
    password: 'POSTGRES_PASSWORD',
    database: 'POSTGRES_DB',
    schema: 'POSTGRES_SCHEMA',
    synchronize: 'POSTGRES_SYNC_HRONIZE',
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

  port: {
    http: {
      __name: 'PORT_HTTP',
      __format: 'json',
    },
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
