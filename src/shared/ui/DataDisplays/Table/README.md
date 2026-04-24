# Table

Component bảng dùng chung cho các feature trong hệ thống.

## Mục đích

`Table` là component base để render dữ liệu dạng bảng theo kiểu generic.

Dùng cho các màn như:

- danh sách nhân viên
- danh sách nguyên vật liệu
- danh sách phiếu
- bảng đối chiếu
- bảng có expandable row

Component này chỉ lo:

- render header
- render rows
- render empty state
- render toolbar
- xử lý row click
- xử lý expanded row cơ bản

Component này không nên lo:

- gọi API
- giữ business logic của feature
- format dữ liệu đặc thù cho từng màn

## Ánh xạ sang .NET

Nếu quen `.NET/Blazor`, có thể hiểu:

- `Table.tsx` ~= `TableBootstrap.razor` bản gọn
- `items` ~= `IEnumerable<TItem>`
- `columns` ~= cấu hình header + render cell
- `getRowKey` ~= khóa định danh cho từng row
- `toolbar` ~= `Toolbar`
- `renderExpandedRow` ~= `ExpandDetail`

## File liên quan

- `Table.tsx`
- `Table.module.css`

## Props chính

### `items`

```tsx
items: TItem[]
```

Danh sách dữ liệu của bảng.

Ví dụ:

```tsx
items={employees}
```

### `columns`

```tsx
columns: TableColumn<TItem>[]
```

Danh sách cấu hình cột.

Mỗi cột gồm:

- `key`: khóa cột
- `header`: tiêu đề cột
- `width`: độ rộng tùy chọn
- `align`: canh lề (`left`, `center`, `right`)
- `render(item)`: cách render dữ liệu trong ô

Ví dụ:

```tsx
const columns = [
  {
    key: "code",
    header: "Mã",
    width: "20%",
    render: (item) => item.code,
  },
];
```

### `getRowKey`

```tsx
getRowKey: (item: TItem) => string
```

Hàm trả về khóa duy nhất cho mỗi dòng.

Ví dụ:

```tsx
getRowKey={(item) => item.id}
```

Nên dùng id ổn định, không dùng index nếu tránh được.

### `toolbar`

```tsx
toolbar?: React.ReactNode
```

Khối nội dung hiển thị phía trên bảng.

Thường dùng cho:

- nút thêm mới
- ô tìm kiếm
- bộ lọc
- action bar

Ví dụ:

```tsx
toolbar={
  <div>
    <button type="button">Thêm mới</button>
  </div>
}
```

### `emptyState`

```tsx
emptyState?: React.ReactNode
```

Nội dung hiển thị khi bảng không có dữ liệu.

Ví dụ:

```tsx
emptyState="Không có dữ liệu."
```

### `onRowClick`

```tsx
onRowClick?: (item: TItem) => void
```

Hàm chạy khi người dùng click vào một dòng.

Ví dụ:

```tsx
onRowClick={(item) => openDetail(item)}
```

### `renderExpandedRow`

```tsx
renderExpandedRow?: (item: TItem) => React.ReactNode
```

Nếu truyền prop này, bảng có thể render thêm một hàng detail bên dưới dòng chính.

Ví dụ:

```tsx
renderExpandedRow={(item) => (
  <div>
    <div>Email: {item.email}</div>
    <div>Số điện thoại: {item.phone}</div>
  </div>
)}
```

## Kiểu `TableColumn<TItem>`

```tsx
export type TableColumn<TItem> = {
  key: string;
  header: React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  render: (item: TItem) => React.ReactNode;
};
```

## Cách dùng cơ bản

Ví dụ bảng danh sách nhân viên:

```tsx
import { Table, type TableColumn } from "@/shared/ui/DataDisplays/Table/Table";

type Employee = {
  id: string;
  code: string;
  name: string;
  department: string;
};

const columns: TableColumn<Employee>[] = [
  {
    key: "code",
    header: "Mã",
    width: "20%",
    render: (item) => item.code,
  },
  {
    key: "name",
    header: "Tên nhân viên",
    width: "40%",
    render: (item) => item.name,
  },
  {
    key: "department",
    header: "Phòng ban",
    width: "30%",
    render: (item) => item.department,
  },
  {
    key: "action",
    header: "",
    width: "10%",
    align: "center",
    render: () => "Xem",
  },
];

export function EmployeeTable({ items }: { items: Employee[] }) {
  return (
    <Table
      items={items}
      columns={columns}
      getRowKey={(item) => item.id}
      emptyState="Chưa có nhân viên nào."
    />
  );
}
```

## Dùng với toolbar

```tsx
<Table
  items={items}
  columns={columns}
  getRowKey={(item) => item.id}
  toolbar={
    <div>
      <button type="button">Thêm mới</button>
    </div>
  }
/>
```

## Dùng với row click

```tsx
<Table
  items={items}
  columns={columns}
  getRowKey={(item) => item.id}
  onRowClick={(item) => {
    console.log(item);
  }}
/>
```

## Dùng với expanded row

```tsx
<Table
  items={items}
  columns={columns}
  getRowKey={(item) => item.id}
  renderExpandedRow={(item) => (
    <div style={{ padding: 16 }}>
      <div>Email: {item.email}</div>
      <div>Phone: {item.phone}</div>
    </div>
  )}
/>
```

## Quy ước mở rộng

### Nên thêm vào `Table` base khi:

- tính năng dùng lại ở nhiều bảng
- ví dụ:
  - loading state chung
  - selectable row
  - sticky header
  - sorting UI cơ bản

### Không nên thêm vào `Table` base khi:

- chỉ một feature cần
- ví dụ:
  - width đặc thù cho một màn
  - render cell quá riêng
  - layout detail chỉ có ở một bảng

Khi đó nên tạo wrapper riêng như:

- `EmployeeTable.tsx`
- `MaterialTable.tsx`
- `PurchaseOrderTable.tsx`

## Không nên làm

- Không gọi API trong `Table`
- Không nhét business logic của feature vào `Table`
- Không tạo một component table thần thánh ôm mọi use case
- Không dồn tất cả responsive config của mọi bảng vào `Table.module.css`

## Checklist khi tạo bảng mới

1. Xác định `TItem`
2. Tạo `columns`
3. Chọn `getRowKey`
4. Cần `toolbar` không?
5. Cần `emptyState` riêng không?
6. Cần `onRowClick` không?
7. Cần `renderExpandedRow` không?
8. Nếu bảng có style riêng nhiều, tạo wrapper riêng

## Ghi nhớ ngắn

`Table` base chỉ là shell chung.

Feature-specific table mới là nơi chứa:

- columns thực tế
- action thực tế
- formatting riêng
- expanded row riêng
