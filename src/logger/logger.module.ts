import { DynamicModule, Global, Module } from '@nestjs/common';

import { CreateLoggerProvidersConfiguration } from './logger.interface';
import { createLoggerProviders } from './logger.providers';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(config: CreateLoggerProvidersConfiguration): DynamicModule {
    const providers = createLoggerProviders(config);
    return {
      module: LoggerModule,
      components: providers,
      exports: providers
    };
  }
}