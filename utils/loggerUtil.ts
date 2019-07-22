import log4js from 'log4js';
import { config } from '../const/config';
log4js.configure(config.log4jsConfigure);
export const logger = log4js.getLogger();