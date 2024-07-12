import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import { useAuth } from '@hooks/use-auth';
import { priceFormatting } from '@assets/scripts';
import { getPurchaseHistory } from '@services/admin/purchase';

export const AdminPurchasesListPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    getPurchasesData();
  }, []);

  const getPurchasesData = async () => {
    try {
      const data = await getPurchaseHistory(user.id);
      setPurchases(data);
    } catch (error) {
      console.error('Error fetching purchase history:', error);
      // TODO: handle error appropriately
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

  const tableItems = purchases.map(purchase => ({
    key: purchase.purchaseId,
    date: new Date(purchase.date).toLocaleDateString(),
    quantity: purchase.items.reduce((acc, item) => acc + item.quantity, 0),
    finalPrice: `$${priceFormatting(purchase.totalAmount)}`,
    actions: (
      <div className="flex justify-center gap-2">
        <Button type="primary" size="middle" icon={<EyeOutlined />} onClick={() => handleView(purchase.purchaseId)} />
      </div>
    ),
  }));

  return (
    <div>
      <h1 className="font-light text-4xl tracking-wide leading-relaxed">Mis Compras</h1>
      <Table columns={columns} dataSource={tableItems} className="mt-6 border border-[#ddd] rounded-md bg-white" />
    </div>
  );
};
