import { Controller } from 'react-hook-form';
import { Input as InputAnt } from 'antd';

export const Input = (props) => {
  const { control, name, rules, ...rest } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => <InputAnt status={error ? 'error' : ''} {...field} {...rest} />}
      rules={rules}
    />
  );
};
