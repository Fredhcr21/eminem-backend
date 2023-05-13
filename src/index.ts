import app from './app';
import { Config } from './config';
import { logger } from './core';
import seeds from './seed';

const seed = process.argv.find((arg) => arg === 'seed');

app.listen({ port: Config.app.port }, (): void => {
  logger.info(`🚀 ${Config.app.name} up and running in ${Config.app.env} @ http://localhost:${Config.app.port}`);
  if (seed) {
    seeds.populateAuthPermissions();
    seeds.populatePermissions();
    seeds.populateRoles();
  }
});
