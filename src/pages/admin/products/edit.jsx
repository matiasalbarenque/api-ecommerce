import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { EditOutlined, DollarOutlined, InboxOutlined, SaveOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Input from '@atoms/input';
import Select from '@atoms/select';
import { categories, products } from '@assets/mockup';

export function Component() {
  const navigate = useNavigate();
  const params = useParams();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      price: '',
      stock: '',
      category: '',
    },
    shouldUnregister: true,
  });

  const isFormValid = Object.keys(formState.errors).length === 0;

  useEffect(() => {
    let product = null;
    const productList = products.find((a) => {
      const productFound = a.items.find((b) => b.id.toString() === params.id);
      if (productFound) {
        product = productFound;
      }
      return productFound;
    });

    if (product) {
      reset({
        price: product.price,
        stock: product.stock,
        title: product.title,
        category: productList.categoryId,
      });
    }
  }, []);

  const onSubmit = async (formData) => {
    // TODO Guardar dato en BD
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
              name="category"
              size="large"
              placeholder="Categoría"
              rules={{ required: true }}
              prefix={<UnorderedListOutlined />}
              className="w-full"
              options={categories.map((a) => ({ value: a.id, label: <span>{a.title}</span> }))}
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
