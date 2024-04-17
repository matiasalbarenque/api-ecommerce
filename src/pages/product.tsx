import { useParams } from 'react-router-dom';

export default function ProductPage() {
  const params = useParams();
  return <b>product: {params.id}</b>;
}
