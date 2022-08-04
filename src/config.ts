import * as config from 'config';

export const INFO_VERSION = config.get('version') as string;


// server 
export const SERVER_PORT = config.get('server.port') as number;