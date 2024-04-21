import { useSearchParams } from "react-router-dom";

export function Component() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  return <b>search-results: {searchQuery}</b>;
}
