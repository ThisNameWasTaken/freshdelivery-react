import usePrice from '@framework/product/use-price';
import { i18n } from 'next-i18next';
import Image from 'next/image';

export const OrderDetailsContent: React.FC<{ item?: any }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.price,
    currencyCode: 'RON',
  });

  const language = i18n?.language || 'ro';

  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-skin-base text-[12px] md:text-[14px]">
      <div className="col-span-2 self-center">
        <Image
          src={item.image.thumbnail}
          alt=""
          width="60"
          height="60"
          quality={100}
          className="object-cover"
        />
      </div>
      <div className="col-span-5 self-center">
        <h2 className="text-skin-base">{item.name[language]}</h2>
      </div>
      <div className="col-span-3 self-center md:text-start text-center">
        {typeof item.quantity === 'number' && <p>{item.quantity}x</p>}
      </div>
      <div className="col-span-2 self-center">
        {typeof item.price === 'number' && <p>{price}</p>}
      </div>
    </div>
  );
};
