# AppTable

Wrapper bang dung chung cua app.

## Muc dich

`AppTable` la public UI API cho bang trong he thong.

Feature khong nen dung raw TanStack Table truc tiep.

Kien truc dung la:

feature -> AppTable -> TanStack Table

## Dung khi nao

Dung cho cac man:
- danh sach nhan vien
- danh sach vat tu
- bang co toolbar
- bang co row click
- bang can mo rong ve sau voi sorting/filtering/selection

## Khong nen

- import raw TanStack trong feature
- de feature phu thuoc truc tiep vao API cua thu vien
- nhet business logic vao `AppTable`

## Props chinh

- `items`
- `columns`
- `getRowKey`
- `toolbar`
- `emptyState`
- `onRowClick`

## Ghi chu

API cua `AppTable` la contract cua app, khong phai contract cua TanStack.
