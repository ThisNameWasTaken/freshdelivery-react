import cn from 'classnames';

type TagProps = {
  name: string;
  slug: string;
} & JSX.IntrinsicElements['div'];

const Tag: React.FC<TagProps> = ({ name, slug, className, ...props }) => (
  <div
    className={cn(
      'font-medium text-base md:text-sm rounded hover:bg-skin-button-secondary block border border-sink-base px-2 py-1 transition',
      className
    )}
    role="button"
    {...props}
  >
    {name}
  </div>
);

export default Tag;
