import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { cx } from '@/utils';

export const Form = ({
  onSubmit,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  onSubmit: SubmitHandler<FieldValues>;
}) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form
        {...rest}
        className={cx('flex flex-1 flex-col', className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
};
