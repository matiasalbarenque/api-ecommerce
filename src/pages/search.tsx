import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  return <b>search-results: {searchQuery}</b>;
}
