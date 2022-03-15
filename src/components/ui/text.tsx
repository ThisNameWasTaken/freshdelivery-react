import React, { CSSProperties } from 'react';
import cn from 'classnames';

type TextProps = {
  variant?: Variant;
} & JSX.IntrinsicElements['p'];

type Variant = 'body' | 'medium' | 'small';

const Text: React.FC<TextProps> = ({
  className,
  variant = 'body',
  ...props
}) => (
  <p
    className={cn(
      'text-skin-muted text-sm leading-7',
      {
        'lg:leading-[27px] lg:text-15px': variant === 'body',
        'lg:text-15px xl:text-base': variant === 'medium',
        'lg:leading-[1.85em]': variant === 'small',
      },
      className
    )}
    {...props}
  />
);

export default Text;
