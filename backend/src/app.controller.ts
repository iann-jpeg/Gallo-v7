import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {

  @Get()
  getRoot(): string {
    return 'Backend API is running!';
  }

  @Get('favicon.ico')
  getFavicon(@Res() res: Response) {
    res.set({
      'Content-Type': 'image/x-icon',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    });
    // You can use a default empty favicon or serve a real one from your public folder
    res.status(204).end(); // No Content, avoids 404 and CORP error
  }
}
