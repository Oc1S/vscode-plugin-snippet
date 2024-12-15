import { useState } from 'react';
// src/popover-trigger.tsx
import { Children, cloneElement, useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  PopoverTrigger,
  usePopoverContext,
} from '@nextui-org/react';
import { pickChildren } from '@nextui-org/react-utils';
import { useAriaButton } from '@nextui-org/use-aria-button';
import { mergeProps } from '@react-aria/utils';

import { store } from '@/store';

import { Input } from '../input';
// let PopoverTrigger = props => {
//   let _a;
//   const { triggerRef, getTriggerProps } = usePopoverContext();
//   const { children, ...otherProps } = props;
//   const child = useMemo(() => {
//     if (typeof children === 'string')
//       return /* @__PURE__ */ jsx('p', { children });
//     return Children.only(children);
//   }, [children]);
//   const childRef = (_a = child.props.ref) != null ? _a : child.ref;
//   const { onPress, isDisabled, ...restProps } = useMemo(() => {
//     return getTriggerProps(mergeProps(otherProps, child.props), childRef);
//   }, [getTriggerProps, child.props, otherProps, childRef]);
//   const [, triggerChildren] = pickChildren(children, Button);
//   const { buttonProps } = useAriaButton({ onPress, isDisabled }, triggerRef);
//   const hasNextUIButton = useMemo(() => {
//     return (triggerChildren == null ? void 0 : triggerChildren[0]) !== void 0;
//   }, [triggerChildren]);
//   return cloneElement(
//     child,
//     mergeProps(
//       restProps,
//       hasNextUIButton ? { onPress, isDisabled } : buttonProps
//     )
//   );
// };

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
  return (
    <div className="flex items-center">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Input
            placeholder="Search"
            className="w-[400px]"
            onValueChange={search}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="actions" variant="flat">
          <DropdownItem key="profile">Signed in as</DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
