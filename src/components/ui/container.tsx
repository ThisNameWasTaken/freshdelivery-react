import cn from 'classnames';

const Container: React.FC<JSX.IntrinsicElements['div']> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10',
      className
    )}
    {...props}
  />
);

export default Container;
