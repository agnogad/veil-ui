import { Pagination } from "./index";

export function PaginationBasic() {
  return <Pagination page={5} totalPages={20} />;
}

export function PaginationShort() {
  return <Pagination page={1} totalPages={3} />;
}
