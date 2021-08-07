import Joi = require('@hapi/joi');
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config';
import { AppConfigService } from './config.service';
/**
 * **summary**: Import and provide app configuration related classes
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        // GENERAL
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        _PORT: Joi.number().default(3000),
        // // DATABASE
        // REMOTE_DB: Joi.string(),
        // TEST_DB: Joi.string(),
        // LOCAL_DB: Joi.string(),
        // REDIS SERVER
        CACHE_TYPE: Joi.string().required(),
        CACHE_HOST: Joi.string().required(),
        CACHE_PORT: Joi.string().required(),
        CACHE_TTL: Joi.string().required(),
        // JWT AUTHORIZATION
        JWT_SECRET_KEY: Joi.string().required(),
        JWT_EXP_TIME: Joi.string().required(),
      }),
      validationOptions: {
        allowUnkown: false, // enforce validation, don't allow unknown keys in the env variables
        abortEarly: true, // stop validation on first error
      },
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
