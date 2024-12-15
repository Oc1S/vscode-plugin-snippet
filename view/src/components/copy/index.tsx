import React, { FC, useState } from 'react';
import { Button, ButtonProps } from '@nextui-org/react';
import copy from 'copy-to-clipboard';
import { AnimatePresence, motion } from 'framer-motion';

import { useCleanUp } from '@/hooks/use-clean-up';
import { ParentComponent } from '@/types/react';
import { cx } from '@/utils';

import { Check, Clipboard } from '../icons';

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

const ScaleAnimationBox: ParentComponent = ({ children }) => {
  return (
    <motion.div
      className="flex"
      initial={variants.hidden}
      animate={variants.visible}
      exit={variants.hidden}
      transition={{
        duration: 0.15,
      }}
    >
      {children}
    </motion.div>
  );
};

export const Copy: FC<
  ButtonProps & {
    content: string;
  }
> = props => {
  const { content, className, onPress, ...domProps } = props;
  const [copying, setCopying] = useState(false);

  let timer: ReturnType<typeof setTimeout>;
  const onCopy = () => {
    copy(content);
    if (copying) return;
    setCopying(true);
    timer = setTimeout(() => {
      setCopying(false);
    }, 2000);
  };

  useCleanUp(() => {
    clearTimeout(timer);
  });

  return (
    <Button
      type="button"
      aria-label="Copy code"
      size="sm"
      className={cx(
        'flex cursor-pointer items-center justify-center rounded-md border border-[#303030] bg-black/20 text-[#eeeeee] transition duration-200 focus-visible:opacity-100 focus-visible:shadow-[0_0_0_1px_#303030]',
        className
      )}
      isIconOnly
      onPress={e => {
        onPress?.(e);
        onCopy();
      }}
      {...domProps}
      data-copying={copying}
    >
      <AnimatePresence initial={false} mode="wait">
        {copying ? (
          <ScaleAnimationBox>
            <Check />
          </ScaleAnimationBox>
        ) : (
          <ScaleAnimationBox>
            <Clipboard />
          </ScaleAnimationBox>
        )}
      </AnimatePresence>
    </Button>
  );
};
