# shadcn Components

File này ghi lại các component đã được add từ `shadcn/ui`, chúng đang nằm ở đâu, có tác dụng gì, và app đang bọc chúng như thế nào.

## Mục đích của thư mục này

Thư mục này chứa **component gốc được generate từ shadcn**.

Đây không phải nơi public UI layer chính thức của app.

Feature code không nên import trực tiếp từ đây nếu đã có wrapper `App*`.

## Component đã add hiện tại

### 1. Button

- File: [button.tsx](/F:/UserInterface/hrm-mobile/src/shared/ui/shadcn/button.tsx)
- Vai trò:
  - cung cấp button có hệ `variant` và `size`
  - dùng làm implementation phía dưới cho button của app

### 2. Dialog

- File: [dialog.tsx](/F:/UserInterface/hrm-mobile/src/shared/ui/shadcn/dialog.tsx)
- Vai trò:
  - cung cấp dialog/modal primitive theo kiểu shadcn + Radix
  - dùng làm implementation phía dưới cho dialog của app

## Wrapper hiện tại của app

### 1. AppButton

- File: [AppButton.tsx](/F:/UserInterface/hrm-mobile/src/shared/ui/Buttons/AppButton.tsx)
- Hiện tại wrapper này còn mỏng
- Vai trò hiện tại:
  - bọc `Button` của shadcn
  - tạo public API button của app

### 2. AppDialog

- File: [AppDialog.tsx](/F:/UserInterface/hrm-mobile/src/shared/ui/Overlays/AppDialog.tsx)
- Hiện tại wrapper này còn mỏng
- Vai trò hiện tại:
  - bọc `Dialog` của shadcn
  - tạo public API dialog của app

## Quy ước sử dụng

### Không nên

Import trực tiếp từ thư mục này ở nhiều feature:

```tsx
import { Button } from "@/shared/ui/shadcn/button";
```

### Nên

Import qua wrapper của app:

```tsx
import { AppButton } from "@/shared/ui/Buttons/AppButton";
import { AppDialog } from "@/shared/ui/Overlays/AppDialog";
```

## Vì sao không dùng trực tiếp shadcn everywhere?

Vì nếu feature code phụ thuộc trực tiếp vào shadcn:

- khó đổi theme
- khó đổi implementation
- dễ lặp lại vấn đề "nửa app là component của mình, nửa app là component library"

## Vai trò của wrapper

Hiện tại wrapper đang rất mỏng, nhưng đó là chủ ý.

Wrapper giúp project có chỗ để:

- thêm style mặc định của công ty
- map lại props theo nhu cầu app
- đổi implementation về sau
- giữ cho feature code không dính chặt vào thư viện bên dưới

## Khi nào wrapper sẽ được mở rộng?

Khi app cần:

- default variant / default size riêng
- token/theme riêng
- loading state
- icon convention
- analytics
- hành vi chung của dialog/button

## Ghi nhớ ngắn

### `src/shared/ui/shadcn`

= implementation layer / generated layer

### `src/shared/ui/Buttons/AppButton.tsx`
### `src/shared/ui/Overlays/AppDialog.tsx`

= public UI API của app
