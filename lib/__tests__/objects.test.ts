import {describe, expect, test} from '@jest/globals'
import {pluralize, SchemaObjectType, SchemaObjectTypePlural} from '../objects/objects'
import {zip} from 'lodash'

describe('objects', () => {
  describe('pluralize(SchemaObjectType)', () => {
    test('maps SchemaObjectType to SchemaObjectTypePlural', () => {
      for (const [singular, plural] of zip(Object.values(SchemaObjectType), Object.values(SchemaObjectTypePlural))) {
        expect(pluralize(singular!)).toBe(plural!)
      }

    })
  })
})
