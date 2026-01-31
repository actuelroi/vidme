import { type SchemaTypeDefinition } from 'sanity'


import {categoryType} from './categoryType'
import { productVariant } from './productVariant'
import { productType } from './productType'
import { vendorType } from './vendorType'
import { orderType } from './orderType'
import { userType } from './user'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType,productVariant, categoryType,vendorType, orderType, userType],
}
