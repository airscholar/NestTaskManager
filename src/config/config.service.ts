import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * **summary**: This class provides the configservice 'getter' functionality to get variables from the environment
 * that are registered to this custom configuration module
 */
@Injectable()
export class AppConfigService {
  /**
   * **summary**: The [**ConfigService**](https://docs.nestjs.com/techniques/configuration#using-the-configservice) is used to access the environment variables
   * @param configService
   */
  constructor(private readonly configService: ConfigService) {}
  /**
   * **summary**: Retrieve the **PORT** environment variable
   */
  get PORT(): number {
    return this.configService.get<number>('app.PORT');
  }
  /**
   * **summary**: Retrieve the **JWT_SECRET_KE  Y** environment variable
   */
  get JWT_SECRET_KEY(): string {
    return this.configService.get<string>('app.JWT_SECRET_KEY');
  }
  /**
   * **summary**: Retrieve the **JWT_EXP_TIME** environment variable
   */
  get JWT_EXP_TIME(): string {
    return this.configService.get<string>('app.JWT_EXP_TIME');
  }
  /**
   * **summary**: Retrieve the **CACHE_TYPE** environment variable
   */
  get CACHE_TYPE(): string {
    return this.configService.get<string>('app.CACHE_TYPE');
  }
  get CACHE_PORT(): string {
    return this.configService.get<string>('app.CACHE_PORT');
  }
  get CACHE_HOST(): string {
    return this.configService.get<string>('app.CACHE_HOST');
  }
  get CACHE_TTL(): string {
    return this.configService.get<string>('app.CACHE_TTL');
  }
  /**
   * **summary**: Retrieve the **REDIS_PORT** environment variable
   */
  get REDIS_PORT(): string {
    return this.configService.get<string>('app.REDIS_PORT');
  }
}
