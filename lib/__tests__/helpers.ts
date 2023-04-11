import fs from 'fs'

export const fixLineEndings = (str: string) => {
  return str.split(/\r\n|\n|\r/g).join('\n')
}

export const readFileFixLineEndings = (file: string) => {
  return fixLineEndings(fs.readFileSync(file).toString())
}