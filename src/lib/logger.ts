import * as chalk from 'chalk'

export function info(...message: any) {
  console.log(chalk.green(message))
}

export function warning(...message: any) {
  console.log(chalk.yellow(message))
}

export function error(...message: any) {
  console.log(chalk.red(message))
}
