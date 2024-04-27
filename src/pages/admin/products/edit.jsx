import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import {
  DollarOutlined,
  EditOutlined,
  InboxOutlined,
  PictureOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import Input from '@atoms/input';
import Select from '@atoms/select';
import { getCategories } from '@services/categories';
import { getProduct, postProduct, putProduct } from '@services/products';

export function Component() {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      price: '',
      imageUrl: '',
      stock: '',
      categoryId: null,
    },
    shouldUnregister: true,
  });

  const isFormValid = Object.keys(formState.errors).length === 0;

  useEffect(() => {
    getCategoriesData();
    if (params.id !== 'new') {
      getProductData();
    }
  }, []);

  const getCategoriesData = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const getProductData = async () => {
    const data = await getProduct(params.id);
    if (data) {
      reset({
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
        title: data.title,
        categoryId: data.categoryId,
      });
    }
  };

  const onSubmit = async (formData) => {
    if (params.id === 'new') {
      postProduct(formData);
    } else {
      putProduct(params.id, formData);
    }
    navigate('/admin/products');
  };

  return (
    <div>
      <h1 className="font-light text-4xl tracking-wide leading-relaxed">
        {params.id === 'new' ? 'Creación de Producto' : 'Edición de Producto'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-4">
          <div>
            <Input
              control={control}
              name="title"
              placeholder="Nombre del producto"
              prefix={<EditOutlined />}
              rules={{ required: true }}
              size="large"
            />
          </div>
          <div>
            <Input
              control={control}
              name="price"
              placeholder="Precio del producto"
              prefix={<DollarOutlined />}
              rules={{ required: true }}
              size="large"
              type="number"
            />
          </div>
          <div>
            <Input
              control={control}
              name="stock"
              placeholder="Stock del producto"
              prefix={<InboxOutlined />}
              rules={{ required: true }}
              size="large"
              type="number"
            />
          </div>
          <div>
            <Select
              control={control}
              name="categoryId"
              size="large"
              placeholder="Categoría"
              rules={{ required: true }}
              className="w-full"
              options={categories.map((a) => ({ value: a.id, label: <span>{a.title}</span> }))}
            />
          </div>
          <div>
            <Input
              control={control}
              name="imageUrl"
              placeholder="Imagen"
              prefix={<PictureOutlined />}
              rules={{ required: true }}
              size="large"
            />
          </div>
        </div>
        <div className="mt-6">
          <Button icon={<SaveOutlined />} htmlType="submit" size="large" type="primary" disabled={!isFormValid}>
            {params.id === 'new' ? 'Crear' : 'Guardar'}
          </Button>
        </div>
      </form>
    </div>
  );
}
