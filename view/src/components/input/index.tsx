import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input as NextUIInput, InputProps } from '@nextui-org/react';

import { cx } from '@/utils';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, classNames = {}, ...rest }, ref) => {
    const { register } = useFormContext() || {};
    const { inputWrapper } = classNames;

    return (
      <NextUIInput
        {...rest}
        {...(name ? register(name) : {})}
        classNames={{
          ...classNames,
          inputWrapper: cx(
            inputWrapper,
            `hover:!bg-default-100 !transition hover:opacity-80`
          ),
        }}
        ref={ref}
      />
    );
  }
);
