/// <reference path = "./knexfile.d.ts" />

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'stickyboard_dev',
      user:     'stickyboard',
      password: 'stickyboard',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  
  test: {
    client: 'postgresql',
    connection: {
      database: 'stickyboard_tests',
      user:     'stickyboard',
      password: 'stickyboard',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  
  ci: {
    client: 'postgresql',
    connection: {
      database: 'stickyboard_ci',
      user:     'postgres',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
  
  /*staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }*/
}
