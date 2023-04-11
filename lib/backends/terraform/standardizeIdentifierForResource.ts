export const standardizeIdentifierForResource = (id: string) => {
  return id.toUpperCase().replace(/[^A-Z0-9_-]/g, '_')
}

export default standardizeIdentifierForResource