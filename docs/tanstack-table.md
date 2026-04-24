# TanStack Table

Ghi chu nhanh cho TanStack Table de sau nay de nho vi sao project da cai no, nen dung no vao dau, va cach dung dung trong kien truc hien tai.

## Trang thai hien tai

Project da cai:

```bash
npm install @tanstack/react-table
```

Package hien dang co trong [package.json](F:/UserInterface/hrm-mobile/package.json):

```json
"@tanstack/react-table": "^8"
```

Neu version cu the thay doi thi xem lai `package.json` la nguon dung nhat.

## TanStack Table la gi?

`TanStack Table` la mot table engine cho React.

No khong phai kieu UI library co san bang dep, phan trang dep, icon dep ngay lap tuc.

No lo cac phan nhu:

- row model
- sorting
- filtering
- selection
- expanded rows
- pagination state

Con giao dien cuoi cung van la do app tu render.

## Tai sao project nay cai TanStack Table?

Vi table la mot trong nhung component de phinh rat nhanh neu tu viet het:

- sort
- filter
- row selection
- expand/collapse
- pagination logic

TanStack Table giup minh dung engine co san, nhung van giu duoc quyen style theo token va UI system cua project.

## Cach dung dung trong project nay

### Khong nen

Feature import va dung raw TanStack khap noi:

```tsx
useReactTable(...)
getCoreRowModel(...)
getSortedRowModel(...)
```

trong tung screen / feature component.

### Nen

Tao wrapper cua app:

- `AppTable`

roi de feature chi dung:

```tsx
<AppTable ... />
```

Kien truc nen la:

```text
feature -> AppTable -> TanStack Table
```

## Tai sao phai di qua AppTable?

De:

- giu public API cua bang on dinh
- doi theme de hon
- tranh feature phu thuoc truc tiep vao API cua thu vien
- giam pham vi anh huong neu TanStack update

## Nguyen tac quan trong

`AppTable` khong nen copy nguyen API cua TanStack Table.

No nen co API rieng cua app, vi du:

- `items`
- `columns`
- `getRowKey`
- `emptyState`
- `toolbar`
- `onRowClick`
- `renderExpandedRow`

Sau do `AppTable` moi map bo props do xuong TanStack.

## Uu diem

- duoc dung engine bang rat manh ngay tu dau
- khong bi khoa giao dien
- hop voi huong wrapper architecture
- giam kha nang lap lai van de nhu Radzen

## Luu y

- Cai package khong co nghia la app tu co bang dep
- Van phai tu to chuc `AppTable`
- Van phai tu style bang token cua project
- Khong nen de feature dung raw TanStack song song voi `AppTable`

## Huong di tiep theo

Khi bat dau lam bang that su:

1. Tao `AppTable`
2. Dinh nghia `AppTableProps` la API cua app
3. Dung TanStack Table ben trong `AppTable`
4. Feature chi dung `AppTable`
