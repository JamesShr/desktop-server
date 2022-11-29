import config from 'config';

export const INFO_VERSION = config.get('version') as string;

// port
export const PORT_HTTP = config.get('port.http') as number;
