import { useParams } from 'react-router-dom';

export function Component() {
  const params = useParams();
  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-[5fr,2fr]">
      <div className="w-full md:h-[70%] p-4 flex flex-col bg-white border rounded-md">
        <span>Descripción del producto {params.id} acá 👈</span>
      </div>
      <div className="w-full min-w-[320px] md:h-full p-4 flex flex-col bg-white border rounded-md">
        <span>Precio, Stock y botón de compra acá 👈</span>
      </div>
    </div>
  );
}
