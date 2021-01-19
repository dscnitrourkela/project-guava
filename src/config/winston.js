import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, colorize } = format;

const logFormat = combine(
  colorize({ all: true }),
  label({ label: 'Project-Guava' }),
  timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
  printf(({ level, message, label, timestamp }) => `[${timestamp}] [${label}] ${level} : ${message}`)
);

const options = {
  console: {
    handleExceptions: true,
    json: false,
    format: logFormat,
  },
};

const logger = createLogger({
  level: 'debug',
  transports: [new transports.Console(options.console)],
  exitOnError: false,
});

export default logger;
