import { forwardRef, useImperativeHandle } from 'react';
import { RefCallBack, useFormContext } from 'react-hook-form';
import { Input as NextUIInput, InputProps } from '@nextui-org/react';

import { cx } from '@/utils';

export const Input = forwardRef<
  RefCallBack,
  InputProps & {
    field?: string;
  }
>(({ field, classNames = {}, ...rest }, ref) => {
  const { register } = useFormContext() || {};
  const { inputWrapper } = classNames;
  if (rest.label === 'Name') {
    console.log({ ...rest }, 'rest@@', ref);
  }

  const registed = (field && register ? register(field) : {}) as ReturnType<
    typeof register
  >;
  const { ref: registerRef } = registed;
  useImperativeHandle(ref, () => registerRef);

  return (
    <NextUIInput
      {...rest}
      {...registed}
      classNames={{
        ...classNames,
        inputWrapper: cx(
          inputWrapper,
          `hover:!bg-default-100 !transition hover:opacity-80`
        ),
      }}
    />
  );
});
