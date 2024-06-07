import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import { useAuth } from '@hooks/use-auth';
import { priceFormatting } from '@assets/scripts';

export const AdminPurchasesListPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getPurchasesData();
  }, []);

  const getPurchasesData = async () => {
    try {
      const data = [];
      //const data = await getProducts(`?userSellerId=${user.id}`);
      setProducts(data);
    } catch {
      // TODO: tratar error
    }
  };

  const handleView = (id) => {
    navigate(`/admin/purchases/${id}`);
  };

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (text, { key }) => <Link to={`/admin/purchases/${key}`}>{text}</Link>,
    },
    {
      title: 'Cantidad de productos',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Precio final',
      dataIndex: 'finalPrice',
      key: 'finalPrice',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 150,
      align: 'center',
    },
  ];

  const tableItems = [];
  const tableItemsTemp = products.map(({ imageUrl, categoryId, id, price, ...rest }) => ({
    key: id,
    date: '',
    quantity: 0,
    finalPrice: `$${priceFormatting(price)}`,
    actions: (
      <div className="flex justify-center gap-2">
        <Button type="primary" size="middle" icon={<EyeOutlined />} onClick={() => handleView(id)} />
      </div>
    ),
  }));
  tableItems.push(...tableItemsTemp);

  return (
    <div>
      <h1 className="font-light text-4xl tracking-wide leading-relaxed">Mis Compras</h1>
      <Table columns={columns} dataSource={tableItems} className="mt-6 border border-[#ddd] rounded-md bg-white" />
    </div>
  );
}
