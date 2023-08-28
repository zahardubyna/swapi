import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'Hello World!';
  }
  getAllAboba() {
    return 'Hello Aboba!';
  }

  getOneAboba(id: string) {
    return `find aboba id = ${id}`;
  }
}
