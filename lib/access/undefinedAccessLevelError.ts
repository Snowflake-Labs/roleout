export class UndefinedAccessLevelError extends Error {
  constructor(str: string) {
    super(`Undefined access level ${str}`)
  }
}
