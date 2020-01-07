import * as fs from 'fs'

export function isFileExists(filePath: string) {
  try {
    fs.statSync(filePath)
    return true
  } catch (e) {
    return false
  }
}

export function read(path: string) {
  return fs.readFileSync(path, 'utf8')
}

export function readDir(path: string) {
  return fs.readdirSync(path);
}
