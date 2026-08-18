import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import pino from 'pino';
import { AppModule } from './app.module.js';
import { loadConfig } from './config.js';

const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });

async function bootstrap(): Promise<void> {
  const config = loadConfig();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.enableShutdownHooks();
  app.enableCors({ origin: true, credentials: true });

  await app.listen(config.PORT, '0.0.0.0');
  logger.info({ port: config.PORT }, 'alma api started');
}

bootstrap().catch((error: unknown) => {
  logger.fatal({ error }, 'failed to start alma api');
  process.exit(1);
});
