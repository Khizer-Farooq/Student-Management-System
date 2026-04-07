import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Auto-load all entities registered via forFeature()
    autoLoadEntities: true,

    // NEVER true in production — use migrations instead
    synchronize: process.env.NODE_ENV === 'development',

    // SSL for production (e.g., RDS, Supabase, Neon)
    /*   ssl:
      process.env.DB_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false, */

    // Connection pooling — tune based on load
    extra: {
      max: 20, // max pool size
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },

    // Logging — queries only in dev, errors always
    logging:
      process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],

    // Migrations path (for production)
    migrations: ['dist/database/migrations/*.js'],
    migrationsRun: process.env.NODE_ENV === 'production',
  }),
);
