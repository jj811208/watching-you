declare type logLevel = 'error' | 'warn' | 'verbose';
declare function log(message: string, level: logLevel): void;
export default log;
