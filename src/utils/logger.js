import bunyan from 'browser-bunyan';

const consoleFormattedStream = new bunyan.ConsoleFormattedStream();
const stdSerializers = bunyan.stdSerializers;
const loggerConfig = {
  name: 'logger',
  streams: [{
    level: 'info',
    stream: consoleFormattedStream,
    serializers: stdSerializers,
  }, {
    level: 'error',
    stream: consoleFormattedStream,
    serializers: stdSerializers,
  }],
};

export default bunyan.createLogger(loggerConfig);
