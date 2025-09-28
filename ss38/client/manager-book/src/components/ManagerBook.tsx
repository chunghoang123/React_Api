import FilterBook from "./FilterBook";
import FormBook from "./FormBook";
import Header from "./Header";
import ListBook from "./ListBook";

export default function ManagerBook() {
  return (
    <div className="flex justify-center p-12">
      <div className="p-6 bg-gray-50  w-[800px]">
        <Header></Header>

        <FormBook></FormBook>

        <FilterBook />

        <ListBook />
      </div>
    </div>
  );
}
