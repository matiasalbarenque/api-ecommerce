import { Controller } from 'react-hook-form';
import { Input as InputAnt } from 'antd';

const Input = (props) => {
  const { control, name, ...rest } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => <InputAnt status={error ? 'error' : ''} {...field} {...rest} />}
      rules={{ required: true }}
    />
  );
};
export default Input;
