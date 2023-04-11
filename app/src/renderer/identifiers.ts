export enum IdentifierType {
  Unquoted,
  DoubleQuoted
}

export const INVALID_UNQUOTED_IDENTIFIER_REGEX = /[^A-Z0-9_]/g
export const INVALID_QUOTED_IDENTIFIER_REGEX = /[^a-zA-Z0-9_\-$ ]/g

export const stripInvalidCharacters = (str: string, identifierType: IdentifierType) => {
  switch (identifierType) {
  case IdentifierType.Unquoted:
    return str.toUpperCase().replaceAll(INVALID_UNQUOTED_IDENTIFIER_REGEX, '')
  case IdentifierType.DoubleQuoted:
    return str.replaceAll(INVALID_QUOTED_IDENTIFIER_REGEX, '')
  }
}