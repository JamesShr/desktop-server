import { Injectable, OnApplicationBootstrap,Logger } from '@nestjs/common';
import snmp from 'net-snmp';

@Injectable()
export class SnmpService implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    // Logger.log('start');
    // const agent = snmp.createAgent(
    //   {
    //     port: 161,
    //     disableAuthorization: false,
    //     accessControlModelType: snmp.AccessControlModelType.None,
    //     engineID: '8000B98380XXXXXXXXXXXXXXXXXXXXXXXX', // where the X's are random hex digits
    //     address: null,
    //     transport: 'udp4',
    //   },
    //   (error, data) => {
    //     if (error) {
    //       console.error(error);
    //     } else {
    //       console.log(JSON.stringify(data, null, 2));
    //     }
    //   },
    // );
    // Logger.log('end');
    // const session = snmp.createSession('127.0.0.1', 'public', {
    //   timeout: 1000,
    // });

    // const oids = ['1.3.6.1.2.1.1.5.0', '1.3.6.1.2.1.1.6.0'];

    // session.get(oids, function (error, varbinds) {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     for (let i = 0; i < varbinds.length; i++)
    //       if (snmp.isVarbindError(varbinds[i]))
    //         console.error(snmp.varbindError(varbinds[i]));
    //       else console.log(varbinds[i].oid + ' = ' + varbinds[i].value);
    //   }
    //   session.close();
    // });

    // session.trap(snmp.TrapType.LinkDown, function (error) {
    //   if (error) console.error(error);
    // });
  }
}
