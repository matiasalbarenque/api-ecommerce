import { Controller } from 'react-hook-form';
import { Input as InputAnt } from 'antd';

const TextArea = (props) => {
  const { control, name, rows = 5, ...rest } = props;
  const { TextArea: TextAreaAnt } = InputAnt;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextAreaAnt status={error ? 'error' : ''} {...field} {...rest} rows={rows} />
      )}
      rules={{ required: true }}
    />
  );
};
export default TextArea;
