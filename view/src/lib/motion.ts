export const menuVariants = {
  open: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: 'inset(10% 50% 90% 50%)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
};
