import cn from 'classnames';
import Image from 'next/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/modal/modal.context';
import { useWindowSize } from 'react-use';
import { useCart } from '@contexts/cart/cart.context';
import { AddToCart } from '@components/product/add-to-cart';
import { i18n, useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import { IoAddOutline, IoCart } from 'react-icons/io5';

type ProductProps = {
  product: Product;
  className?: string;
};
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { t } = useTranslation('common');
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-skin-inverted uppercase inline-block bg-skin-red rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="inline-flex bg-skin-primary rounded-full w-8 lg:w-10 h-8 lg:h-10 text-skin-inverted text-4xl items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        <IoCart width={iconSize} height={iconSize} opacity="1" />
      </button>
    );
  }
  return <AddToCart data={data} />;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const { name, image, unit, product_type } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const language = i18n?.language || 'ro';
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'RON',
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: 'RON',
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: 'RON',
  });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      onClick={handlePopupView}
      title={name[language]}
    >
      <div className="relative flex-shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt=""
            width={230}
            height={200}
            quality={100}
            className="object-contain bg-transparent"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="text-[11px] md:text-xs font-bold text-skin-inverted uppercase inline-block bg-skin-primary rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t('text-on-sale')}
            </span>
          )}
        </div>
      </div>

      <div className="absolute bottom-2 right-2">
        <RenderPopupOrAddToCart data={product} />
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <div className="space-s-2 mb-1 lg:mb-1.5">
          <span className="inline-block font-semibold text-sm sm:text-base lg:text-base text-skin-base">
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="text-sm text-skin-base text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
        <h2 className="text-skin-base text-base sm:text-sm lg:text-base leading-5 sm:leading-6 mb-1.5">
          {name[language]}
        </h2>
        <div className="text-base sm:text-sm mt-auto">{unit}</div>
      </div>
    </article>
  );
};

export default ProductCard;
