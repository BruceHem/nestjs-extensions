import { Logger } from './logger';
import { LoggerToken } from './logger.constants';

export function createLoggerProviders() {
  return [
    {
      provide: LoggerToken,
      useFactory: () => new Logger()
    }
  ];
}
