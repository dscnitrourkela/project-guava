import consola from 'consola';
import colors from 'colors';

export const consoleLog = (message) =>
  console.log(colors.white('Log'), message);

export const consoleError = (message) =>
  console.error(colors.red('Error'), message);

export const consoleSuccess = (message) =>
  console.info(colors.green('Success'), message);

export const consoleInfo = (message) =>
  console.info(colors.cyan('Info'), message);

export const consoleWarn = (message) =>
  console.warn(colors.yellow('Warn'), message);
