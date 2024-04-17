import { Controller } from 'react-hook-form';
import { Input as InputAnt } from 'antd';
import type { FieldValues } from 'react-hook-form';
import type { InputProps } from '@/typings/components/atoms';

const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const { control, name } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <InputAnt placeholder="Producto a buscar..." status={error ? 'error' : ''} {...field} />
      )}
      rules={{ required: true }}
    />
  );
};
export default Input;
