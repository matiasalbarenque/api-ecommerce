import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import {
  DollarOutlined,
  EditOutlined,
  InboxOutlined,
  PercentageOutlined,
  PictureOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Input } from '@atoms/input';
import { TextArea } from '@atoms/textarea';
import { Select } from '@atoms/select';
import { useAuth } from '@hooks/use-auth';
import { getCategories } from '@services/categories';
import { getProduct } from '@services/products';
import { postProduct, putProduct } from '@services/admin/products';

export function Component() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      price: 0,
      imageUrl: '',
      stock: 0,
      description: '',
      discount: 0,
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
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      // TODO: Tratar el error con una alerta
    }
  };

  const getProductData = async () => {
    const data = await getProduct(params.id);
    if (data) {
      reset({
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
        title: data.title,
        discount: data.discount || 0,
        description: data.description,
        categoryId: data.categoryId,
      });
    }
  };

  const onSubmit = async (formDataRaw) => {
    const formData = {
      ...formDataRaw,
      userSellerId: user.id,
    };
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-4">
            <div>
              <Input
                control={control}
                id="title-id"
                name="title"
                label="Nombre"
                placeholder="Nombre del producto"
                prefix={<EditOutlined />}
                rules={{ required: true }}
                size="large"
              />
            </div>
            <div>
              <Input
                control={control}
                id="price-id"
                name="price"
                label="Precio"
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
                id="stock-id"
                name="stock"
                label="Stock"
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
                id="category-id"
                name="categoryId"
                label="Categoría"
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
                id="image-id"
                name="imageUrl"
                label="Imagen"
                placeholder="Imagen"
                prefix={<PictureOutlined />}
                rules={{ required: true }}
                size="large"
              />
            </div>
            <div>
              <Input
                control={control}
                id="discount-id"
                name="discount"
                label="Descuento (En porcentaje)"
                placeholder="Descuento del producto"
                prefix={<PercentageOutlined />}
                rules={{ required: true }}
                size="large"
                type="number"
                min="0"
                max="99"
              />
            </div>
          </div>
        </div>
        <div>
          <TextArea
            control={control}
            id="description-id"
            name="description"
            label="Descripción"
            placeholder="Descripción del producto..."
            rules={{ required: true }}
            size="large"
          />
        </div>
        <div className="mt-4">
          <Button icon={<SaveOutlined />} htmlType="submit" size="large" type="primary" disabled={!isFormValid}>
            {params.id === 'new' ? 'Crear' : 'Guardar'}
          </Button>
        </div>
      </form>
    </div>
  );
}