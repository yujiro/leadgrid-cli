import * as logger from './logger'
import * as file from './file'

type LogLevel = 'error' | 'warning' | 'info'

export function exitIfFileNotExists(path: string, logLevel: LogLevel, exitCode: number) {
  if (!file.isFileExists(path)) {
    logger[logLevel](`no such file or directory ${path}`);
    process.exit(exitCode)
  }
}

