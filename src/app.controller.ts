import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      Title: 'Finance System',
      Author: 'José Luis Parra Vite',
      Technologies: {
        DataBase: 'PostgreSQL',
        Language: 'NodeJs',
        Framework: 'NestJs',
        Others: ['TypeORM', 'Postman', 'Swagger', 'Environment Variables'],
      },
    };
  }
}
