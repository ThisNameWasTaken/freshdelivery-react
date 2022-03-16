import React from 'react';
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
        'lg:leading-[27px] lg:text-base': variant === 'body',
        'lg:text-base xl:text-base': variant === 'medium',
        'lg:leading-[1.85em]': variant === 'small',
      },
      className
    )}
    {...props}
  />
);

export default Text;
