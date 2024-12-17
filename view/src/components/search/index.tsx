import { FC, useState } from 'react';
import { motion, Variants } from 'framer-motion';

import { store } from '@/store';

import { Input } from '../input';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const Search = () => {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const search = (val: string) => {
    const codeSets = store.snippet.codeSets();
    const result = codeSets.filter(s => {
      let flag = false;
      s.name.includes(val) && (flag = true);
      s.tags.forEach(t => t.includes(val) && (flag = true));
      return flag;
    });
    setSearchResult(result);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center">
      <Dropdown isOpen={isOpen} />
      <Input
        placeholder="Search"
        className="w-[400px]"
        onValueChange={search}
        onFocus={() => setIsOpen(true)}
        // onBlur={() => setIsOpen(false)}
      />
    </div>
  );
};

export const Dropdown: FC<{
  isOpen: boolean;
}> = ({ isOpen }) => {
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="menu w-[300px] shadow-[#4700b3] drop-shadow-lg"
    >
      <motion.ul
        className="flex flex-col gap-2 bg-white p-2 text-[#6600ff]"
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.li className="block p-2" variants={itemVariants}>
            Item {i}
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};
