import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date() };
  }

  @Get('stats')
  getStats() {
    // Example static stats, replace with real logic
    return {
      users: 100,
      claims: 25,
      quotes: 40,
      revenue: 50000
    };
  }
}
