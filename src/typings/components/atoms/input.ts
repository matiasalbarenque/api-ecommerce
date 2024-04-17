import type { FieldValues, UseControllerProps } from 'react-hook-form';
import type { InputProps as InputAntProps } from 'antd';

export type InputProps<T extends FieldValues> = UseControllerProps<T> & InputAntProps;
