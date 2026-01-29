import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Batle-NA')
    .items([
      S.documentTypeListItem('product').title('Product'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('vendor').title('Vendor'),
      S.divider(),
      S.documentTypeListItem('order').title('Order'),
      
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['product', 'category', 'vendor', 'order'].includes(item.getId()!),
      ),
    ])
