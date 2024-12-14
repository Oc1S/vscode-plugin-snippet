import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input as NextUIInput, InputProps } from '@nextui-org/react';

export const Input: FC<InputProps & { name: string }> = ({ name, ...rest }) => {
  const { register } = useFormContext();
  return (
    <NextUIInput
      label="Name"
      placeholder="New Name"
      variant="bordered"
      {...rest}
      {...register(name)}
    />
  );
};
