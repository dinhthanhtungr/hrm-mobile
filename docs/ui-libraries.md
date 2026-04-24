# UI Libraries

Ghi chu nhanh cac thu vien UI da duoc them vao project de sau nay de nho, de maintain, va nguoi moi vao doc cung hieu duoc vai tro cua tung cai.

## Trang thai hien tai

Hien project da cai va bat dau dung:

- `shadcn/ui`
- `Radix UI`
- `React Aria`
- `TanStack Table`

## 1. shadcn/ui

### La gi?

`shadcn/ui` khong phai kieu UI library dong hoan toan.

No giong:

- mot bo component mau
- mot CLI de generate component vao repo
- mot cach to chuc code theo huong "code thuoc ve project cua minh"

### Y nghia thuc te

Khi add component bang shadcn:

- code component duoc tao vao repo cua minh
- co the sua truc tiep
- khong bi phu thuoc hoan toan vao mot cuc den trong `node_modules`

### Vai tro trong project nay

Hien tai shadcn dang duoc dung nhu:

- nguon component goc de tham khao / tai su dung
- lop implementation phia duoi

Feature code khong nen import truc tiep tu shadcn neu da co wrapper cua app.

## 2. Radix UI

### La gi?

`Radix UI` la bo primitive lo phan hanh vi chuan cua UI component.

Vi du:

- dialog mo/dong
- focus dung
- keyboard behavior chuan
- accessibility nen tang tot hon

### Y nghia thuc te

Radix khong ep giao dien manh.

No thuong lo:

- behavior
- interaction
- accessibility

Con:

- style
- token
- layout cuoi cung

thi app tu quyet.

### Vai tro trong project nay

Hien tai Radix dang la lop primitive ben duoi cho shadcn component.

No khong phai public UI API cua app.

## 3. React Aria

### La gi?

`React Aria` la bo component/hook unstyled tap trung vao:

- accessibility
- keyboard interaction
- focus management
- cac control kho nhu combobox, select, listbox, date picker

### Y nghia thuc te

React Aria khong cho giao dien dep san.

No cho:

- behavior chuan
- aria va keyboard handling tot
- DOM/state model hop ly cho cac control phuc tap

Con style van la do app quyet.

### Vai tro trong project nay

Hien tai project moi chi cai `react-aria-components` de san sang cho cac wrapper sau nay nhu:

- `AppSelect`
- `AppCombobox`

Chua nen import raw React Aria khap feature cho den khi minh chot duoc wrapper chinh thuc.

## 4. TanStack Table

### La gi?

`TanStack Table` la table engine, khong phai UI table dep san.

No manh o cac phan:

- row model
- sorting
- filtering
- selection
- expandable rows
- pagination state

### Y nghia thuc te

TanStack Table khong lo giao dien cuoi cung cho app.

No chu yeu lo:

- state cua bang
- logic xu ly bang
- helper de build bang phuc tap

Con:

- HTML
- CSS
- token
- layout cuoi cung

van la do app quyet.

### Vai tro trong project nay

Project da cai `@tanstack/react-table` de dung cho bang ngay tu dau, nhung khong nen de feature dung raw TanStack truc tiep.

Huong dung dung la:

- tao `AppTable`
- `AppTable` dinh nghia public API cua app
- ben trong `AppTable` moi map sang TanStack Table

Tuc la:

```text
feature -> AppTable -> TanStack Table
```

## Kien truc nen giu

### Khong nen

Feature code import truc tiep tu library o nhieu noi, vi du:

```tsx
import { Button } from "@/shared/ui/shadcn/button";
```

hoac:

```tsx
import { Select } from "react-aria-components";
```

### Nen

Feature code nen di qua component cua app, vi du:

- `AppButton`
- `AppDialog`
- `AppSelect`
- `AppCombobox`
- `AppTable`

Tuc la:

```text
feature -> App* wrapper -> shadcn/radix/react-aria/tanstack
```

chu khong phai:

```text
feature -> thu vien truc tiep
```

## Tai sao phai lam wrapper?

De:

- giu public UI API cua app on dinh
- doi theme de hon
- thay implementation de hon
- tranh lap lai van de ngay xua voi Radzen
- giam anh huong khi thu vien update API

## Ket luan ngan

- `shadcn/ui` = nguon component code ma project co the so huu
- `Radix UI` = lop primitive/behavior phia duoi
- `React Aria` = lop behavior/a11y manh cho control kho
- `TanStack Table` = engine logic cho bang
- app nen dung `App*` wrapper thay vi phu thuoc thang vao thu vien
