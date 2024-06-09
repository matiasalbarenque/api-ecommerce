import { useEffect } from 'react';
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
import { Input } from '@atoms/Input';
import { TextArea } from '@atoms/Textarea';
import { Select } from '@atoms/Select';
import { useAuth } from '@hooks/use-auth';
import { useCategories } from '@hooks/use-categories';
import { getProduct } from '@services/products';
import { postProduct, putProduct } from '@services/admin/products';
import { ROLES } from '@constants';

export const AdminProductsEditPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const { data: categories } = useCategories();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: null,
      title: '',
      price: 0,
      image_url: '',
      stock: 0,
      description: '',
      discount: 0,
      category_id: null,
    },
    shouldUnregister: true,
  });

  const isFormValid = Object.keys(formState.errors).length === 0;

  useEffect(() => {
    if (user.role !== ROLES.SELLER) {
      navigate('/admin');
      return;
    }
    if (params.id !== 'new') {
      getProductData();
    }
  }, []);

  const getProductData = async () => {
    try {
      const data = await getProduct(params.id);
      if (data) {
        reset({
          id: data.id,
          price: data.price,
          stock: data.stock,
          image_url: data.image_url,
          title: data.title,
          discount: data.discount || 0,
          description: data.description,
          category_id: data.category_id,
        });
      }
    } catch {
      // TODO: Tratar el error con una alerta
    }
  };

  const onSubmit = async ({ id, ...formData }) => {
    try {
      if (params.id === 'new') {
        postProduct(formData);
      } else {
        putProduct({ id, ...formData });
      }
      navigate('/admin/products');
    } catch {
      // TODO: tratar el error de guardado
    }
  };

  return (
    <div>
      <h1 className="font-light text-4xl tracking-wide leading-relaxed">
        {params.id === 'new' ? 'Creación de Producto' : 'Edición de Producto'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <Input control={control} id="id" name="id" type="hidden" />
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
                name="category_id"
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
                name="image_url"
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
