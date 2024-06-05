import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, Table } from 'antd';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '@hooks/use-auth';
import { getCategories } from '@services/categories';
import { getProducts, deleteProduct } from '@services/admin/products';
import { priceFormatting } from '@assets/scripts';
import { ROLES } from '@constants';

export function Component() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const idSelected = useRef('');

  useEffect(() => {
    if (user.role !== ROLES.SELLER) {
      navigate('/admin');
      return;
    }
    getCategoriesData();
    getProductsData();
  }, []);

  const getCategoriesData = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      // TODO: Tratar el error con una alerta
    }
  };

  const getProductsData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      // TODO: Tratar el error con una alerta
    }
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

  const tableItems = products.map((a) => ({
    key: a.id,
    price: `$${priceFormatting(a.price)}`,
    category: categories.find((b) => b.id === a.category_id).title,
    stock: a.stock,
    title: a.title,
    actions: (
      <div className="flex justify-center gap-2">
        <Button type="primary" size="middle" icon={<EditFilled />} onClick={() => handleEdit(a.id)} />
        <Button type="primary" size="middle" icon={<DeleteFilled />} danger onClick={() => handleDelete(a.id)} />
      </div>
    ),
  }));

  return (
    <div>
      <h1 className="font-light text-4xl tracking-wide leading-relaxed">Listado de Productos</h1>
      <Button type="primary" icon={<PlusOutlined />} size="large" className="mt-4" onClick={newHandler}>
        Nuevo
      </Button>
      <Table columns={columns} dataSource={tableItems} className="mt-6 border border-[#ddd] rounded-md bg-white" />
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
