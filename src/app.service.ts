import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomePage(): string {
    return `<h1>Welcome to task management Website!</h1>`;
  }
}
