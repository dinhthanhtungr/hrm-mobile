# React Aria

Ghi chu nhanh cho React Aria de sau nay de nho no la gi, da cai gi, va nen dung no vao dau trong project nay.

## Trang thai hien tai

Project da cai:

```bash
npm install react-aria-components
```

Package hien dang co trong [package.json](F:/UserInterface/hrm-mobile/package.json):

```json
"react-aria-components": "^1.17.0"
```

## React Aria la gi?

`React Aria` la bo component va hook unstyled giup minh xay UI component co:

- accessibility tot
- keyboard behavior chuan
- focus management on
- interaction tot tren nhieu loai thiet bi

No khong phai UI kit kieu "co san giao dien dep".

No la lop hanh vi nen de minh tu style theo token cua project.

## Tai sao project nay cai React Aria?

Vi co mot so component kho ma tu viet tu dau rat de met, vi du:

- searchable select
- combobox
- listbox
- date picker
- menu/colection co keyboard navigation

React Aria hop voi project nay vi:

- no khong ep style rieng
- no giong huong "behavior o duoi, UI cua minh o tren"
- no giam nguy co lap lai no dau Radzen ngay xua

## Khi nao nen dung React Aria?

Nen dung khi lam cac component kho nhu:

- `AppSelect`
- `AppCombobox`
- control can keyboard support tot
- control can accessibility nghiem tuc hon

Khong nhat thiet phai dung React Aria cho:

- button don gian
- dialog don gian
- popover / tooltip / tabs

Mays cai do hien tai Radix hop hon.

## Cach dung dung trong project nay

### Khong nen

Feature import truc tiep:

```tsx
import { Select } from "react-aria-components";
```

khap noi trong app.

### Nen

Tao wrapper cua app, vi du:

- `src/shared/ui/Forms/AppSelect.tsx`
- `src/shared/ui/Forms/AppCombobox.tsx`

Roi feature chi dung:

```tsx
<AppSelect />
<AppCombobox />
```

Kien truc nen la:

```text
feature -> AppSelect/AppCombobox -> react-aria-components
```

## Uu diem

- accessibility tot hon
- keyboard behavior on hon
- khong bi khoa theme
- hop voi token/style system hien tai
- gop ly cho cac control phuc tap

## Luu y

- Cai package khong co nghia la app se tu doi UI
- Chi khi import va dung component thi code moi vao client bundle
- Khong nen dung song song nhieu he Select/Combobox khap app neu chua co quy uoc ro rang

## Huong di tiep theo

Khi nao can lam select co tim kiem hoac combobox that su, uu tien:

1. Tao `AppSelect.tsx` hoac `AppCombobox.tsx`
2. Dung React Aria ben duoi
3. Style bang token cua project
4. Khong expose raw React Aria cho feature code
