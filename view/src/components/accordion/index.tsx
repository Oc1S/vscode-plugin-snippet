import { Accordion as NextUIAccordion, AccordionItem } from '@nextui-org/react';

import { AnchorIcon } from './anchor-icon';

export default function Accordion({ content }: { content: string[] }) {
  return (
    <NextUIAccordion>
      {content.map((c, index) => {
        return (
          <AccordionItem key={index} indicator={<AnchorIcon />} title="Anchor">
            {c}
          </AccordionItem>
        );
      })}
    </NextUIAccordion>
  );
}
