import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '@hooks/use-auth';
import { getCategories } from '@services/categories';
import { getProducts, deleteProduct } from '@services/products';
import { priceFormatting } from '@assets/scripts';

export function Component() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const idSelected = useRef('');

  useEffect(() => {
    getCategoriesData();
    getProductsData();
  }, []);

  const getCategoriesData = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const getProductsData = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const newHandler = () => {
    navigate('/admin/products/new');
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/${id}`);
  };

  const handleDelete = (id) => {
    idSelected.current = id;
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    await deleteProduct(idSelected.current);
    closeModal();
    getProductsData();
  };

  const handleModalCancel = () => {
    closeModal();
  };

  const closeModal = () => {
    idSelected.current = null;
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      width: '40%',
      render: (text, { key }) => <Link to={`/admin/products/${key}`}>{text}</Link>,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 150,
      align: 'center',
    },
  ];

  const productList = [];
  const productListFilteredByUserSellerId = products.filter((a) => a.userSellerId === user.id);
  const productsListTemp = productListFilteredByUserSellerId.map(({ imageUrl, categoryId, id, price, ...rest }) => ({
    key: id,
    price: `$${priceFormatting(price)}`,
    category: categories.find((a) => a.id === categoryId).title,
    ...rest,
    actions: (
      <div className="flex justify-center gap-2">
        <Button type="primary" size="middle" icon={<EditFilled />} onClick={() => handleEdit(id)} />
        <Button type="primary" size="middle" icon={<DeleteFilled />} danger onClick={() => handleDelete(id)} />
      </div>
    ),
  }));
  productList.push(...productsListTemp);

  return (
    <div>
      <h1 className="font-light text-4xl tracking-wide leading-relaxed">Listado de Productos</h1>
      <Button type="primary" icon={<PlusOutlined />} size="large" className="mt-4" onClick={newHandler}>
        Nuevo
      </Button>
      <Table columns={columns} dataSource={productList} className="mt-6 border border-[#ddd] rounded-md bg-white" />
      <Modal
        title="Confirmar eliminación"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Eliminar"
        cancelText="Cancelar"
      >
        <p>Está a punto de eliminar el registro seleccionado. ¿Desea continuar?</p>
      </Modal>
    </div>
  );
}
