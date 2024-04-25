import { useSearchParams } from "react-router-dom";

export function Component() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-[1fr,3fr]">
      <div className="w-full min-w-[320px] md:h-full p-4 flex flex-col bg-white border rounded-md">
        <span>Listado de filtros 🔍</span>
      </div>
      <div className="w-full md:h-[70%] p-4 flex flex-col bg-white border rounded-md">
        <span>Productos filtrados basados en ({searchQuery}) acá 👈</span>
      </div>
    </div>
  );
}
