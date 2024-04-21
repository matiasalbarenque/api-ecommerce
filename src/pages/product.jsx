import { useParams } from 'react-router-dom';

export function Component() {
  const params = useParams();
  return (
    <div className="min-h-full flex gap-4">
      <div className="w-full h-[70%] p-4 flex flex-col bg-white border rounded-lg">
        <span>Descripción del producto {params.id} acá 👈</span>
      </div>
      <div className="w-[600px] h-full p-4 flex flex-col bg-white border rounded-lg">
        <span>Precio, Stock y botón de compra acá 👈</span>
      </div>
    </div>
  );
}
