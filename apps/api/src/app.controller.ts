import { Controller, Get } from '@nestjs/common';
import { API_PREFIX, type HealthResponse } from '@alma/shared';

@Controller()
export class AppController {
  @Get(`${API_PREFIX}/health`)
  health(): HealthResponse {
    return {
      status: 'ok',
      service: 'alma-api',
      version: process.env.npm_package_version ?? '0.1.0',
      timestamp: new Date().toISOString()
    };
  }
}
