import { Controller } from 'react-hook-form';
import { Select as SelectAnt } from 'antd';

const Select = (props) => {
  const { control, name, ...rest } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => <SelectAnt status={error ? 'error' : ''} {...field} {...rest} />}
      rules={{ required: true }}
    />
  );
};
export default Select;
