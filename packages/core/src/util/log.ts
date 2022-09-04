type logLevel = 'error' | 'warn' | 'verbose';

function log(message: string, level: logLevel) {
  if (level === 'error') {
    throw Error(message);
  }
  if (process.env.NODE_ENV === 'production') return;
  if (level === 'warn') {
    console.warn(message);
    return;
  }
  if (level === 'verbose') {
    console.log(message);
    return;
  }
}

export default log;
