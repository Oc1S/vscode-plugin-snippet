import { RefObject, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useOnClickOutside } from 'usehooks-ts';

import { useBlockScroll, useEventListener } from '@/hooks';
import { trigger } from '@/lib/mitt';
import { menuVariants } from '@/lib/motion';
import { actions, store } from '@/store';

import { Empty } from '../empty';
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
  const [input, setInput] = useState('');
  const [searchResult, setSearchResult] = useState<ICodeSet[]>([]);

  const search = (val: string) => {
    const codeSets = store.snippet.codeSets();
    const result = codeSets.filter(s => {
      let flag = false;
      s.name.includes(val) && (flag = true);
      s.tags.forEach(t => t.includes(val) && (flag = true));
      return flag;
    });
    setSearchResult(result);
    trigger('dropdown', true);
  };

  const reset = () => {
    setInput('');
    setSearchResult([]);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  return (
    /* line */
    <div className="-mt-20 mb-8 flex items-center">
      {/* relative container */}
      <div className="relative" ref={containerRef}>
        <Input
          value={input}
          placeholder="Search"
          className="w-[400px]"
          onValueChange={value => {
            setInput(value);
            search(value);
          }}
          onFocus={() => {
            input && trigger('dropdown', true);
          }}
        />
        <Dropdown
          list={searchResult}
          outsideElement={containerRef}
          onSelect={reset}
        />
      </div>
    </div>
  );
};

export const Dropdown = (props: {
  list: ICodeSet[];
  outsideElement: RefObject<HTMLElement>;
  onSelect?: (item: ICodeSet, index: number) => void;
}) => {
  const { list, outsideElement, onSelect } = props;
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(outsideElement, () => {
    setIsOpen(false);
  });

  useEventListener('dropdown', setIsOpen);
  useBlockScroll(isOpen);

  const handleSelect = (item: ICodeSet, index: number) => {
    actions.snippet.changeCodeSetById(item.id);
    setIsOpen(false);
    onSelect?.(item, index);
  };

  const hasItem = list.length > 0;
  return (
    <motion.div
      id="dropdown-menu"
      className="z-pop bg-default-300/20 no-scrollbar absolute left-0 top-full flex max-h-[416px] w-full translate-y-0.5 flex-col overflow-scroll rounded-lg p-2 text-white backdrop-blur-lg"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      {hasItem ? (
        <ul>
          {list.map((item, i) => {
            return (
              <motion.li key={i} variants={itemVariants} className="w-full">
                <div
                  tabIndex={0}
                  className="focus:bg-primary/25 hover:bg-primary/15 hover:text-primary-50 h-10 w-full cursor-pointer rounded-md p-2 outline-none transition"
                  onClick={() => handleSelect(item, i)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleSelect(item, i);
                    }
                  }}
                >
                  {item.name}
                </div>
              </motion.li>
            );
          })}
        </ul>
      ) : (
        <Empty />
      )}
    </motion.div>
  );
};
