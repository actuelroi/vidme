import { type SchemaTypeDefinition } from 'sanity'


import {categoryType} from './categoryType'
import { productType } from './productType'
import { vendorType } from './vendorType'
import { orderType } from './orderType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType,vendorType, orderType],
}
