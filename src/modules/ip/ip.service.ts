import { Injectable } from '@nestjs/common';
import { networkInterfaces } from 'os';

@Injectable()
export class IpService {
  getIp(): string[] {
    const list = [];
    const interfaces = networkInterfaces();

    for (const interfaceName in interfaces) {
      const iface = interfaces[interfaceName];

      for (const info of iface) {
        if (!info.internal && info.family === 'IPv4') {
          list.push(info.address);
          // return info.address;
        }
      }
    }

    return list;
  }
}
