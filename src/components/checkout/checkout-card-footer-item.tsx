import { i18n } from 'next-i18next';

type FooterItemProps = {
  id: string;
  name: { [key: string]: string };
  price: string;
};
export const CheckoutCardFooterItem: React.FC<{ item: FooterItemProps }> = ({
  item,
}) => {
  const language = i18n?.language || 'ro';

  return (
    <div className="flex items-center py-4 lg:py-5 border-b border-skin-base text-sm w-full text-base text-skin-base font-medium  last:border-b-0 last:text-base last:pb-0">
      {item.name[language]}
      <span className="ms-auto flex-shrink-0 text-base text-skin-base font-normal">
        {item.price}
      </span>
    </div>
  );
};
