import { Button, Input, Select } from "antd";
import { useAppDispatch } from "../hook/useReducer";
import { getAllBook } from "../apis/book.apis";

const { Option } = Select;

export default function FilterBook() {
  const dispatch = useAppDispatch();

  const handleFilter = (value: string) => {
    dispatch(getAllBook(value));
  };

  return (
    <div className="flex items-center gap-2 mt-4 bg-white p-4 rounded-lg shadow-sm">
      {/* Tìm kiếm theo tên */}
      <Input
        placeholder="Search by title or author"
        className="w-1/3"
        onChange={(e) => handleFilter(e.target.value)}
      />

      {/* Lọc theo lớp */}
      <Select className="w-1/5" defaultValue="" onChange={handleFilter}>
        <Option value="">All</Option>
        <Option value="History">History</Option>
        <Option value="Novel">Novel</Option>
        <Option value="Science">Science</Option>
      </Select>

      {/* Sắp xếp */}
      <Select className="w-1/5" defaultValue="">
        <Option value="">Title A → Z</Option>
        <Option value="za">Title Z → A</Option>
        <Option value="yearAsc">Year ↑</Option>
        <Option value="yearDesc">Year ↓</Option>
      </Select>

      {/* Nút clear */}
      <Button danger>Clear</Button>
    </div>
  );
}
