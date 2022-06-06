import { useEffect, useState } from 'react';
import Button from '@components/button';
import Counter from '@components/counter';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import { useWindowSize } from 'react-use';
import { groupBy } from 'lodash';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import ProductAttributes from '@components/product/product-attributes';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/carousel/thumbnail-carousel';
import { i18n, useTranslation } from 'next-i18next';
import Image from 'next/image';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import Tag from '@components/tag';
import { IoCartOutline } from 'react-icons/io5';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import useProduct from 'src/hooks/useProduct';

const ProductSingleDetails: React.FC = () => {
  const { t } = useTranslation('common');
  const language = i18n?.language || 'ro';
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { width } = useWindowSize();
  const { product } = useProduct(slug as string);
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.PRODUCT}/${router.query.slug}`;
  const { price, basePrice, discount } = usePrice(
    product && {
      amount: product.sale_price ? product.sale_price : product.price,
      baseAmount: product.price,
      currencyCode: 'RON',
    }
  );
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  // useEffect(() => {
  //   console.log({ product });
  // }, [product]);

  const variations = product?.variations
    ? groupBy(product?.variations, 'attribute.slug')
    : {};
  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    const dataVaiOption: any = product?.variation_options;
    selectedVariation = dataVaiOption?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  const item = generateCartItem(product!, selectedVariation);
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = generateCartItem(product!, selectedVariation);
    if (!item.id) return;
    addItemToCart(item, quantity);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  function addToWishlist() {
    // to show btn feedback while product wishlist
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div className="pt-6 md:pt-7 pb-2">
      <div className="lg:grid grid-cols-10 gap-7 2xl:gap-8">
        <div className="col-span-5 xl:col-span-6 overflow-hidden mb-6 md:mb-8 lg:mb-0">
          {!!product?.gallery?.length ? (
            <ThumbnailCarousel
              gallery={product?.gallery}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
            />
          ) : (
            <div className="w-auto flex items-center justify-center">
              <Image
                src={product?.image?.original ?? '/product-placeholder.svg'}
                alt=""
                width={900}
                height={680}
              />
            </div>
          )}
        </div>

        <div className="flex-shrink-0 flex flex-col col-span-5 xl:col-span-4 xl:ps-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-skin-base text-lg md:text-xl xl:text-2xl font-medium transition-colors duration-300">
                {product?.name[language]}
              </h2>
            </div>
            {product?.unit && isEmpty(variations) ? (
              <div className="text-sm md:text-base font-medium">
                {product?.unit}
              </div>
            ) : (
              <VariationPrice
                selectedVariation={selectedVariation}
                minPrice={product?.min_price}
                maxPrice={product?.max_price}
              />
            )}

            {isEmpty(variations) && (
              <div className="flex items-center mt-5">
                <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px]">
                  {price}
                </div>
                {discount && (
                  <>
                    <del className="text-sm md:text-base ps-3 text-skin-base text-opacity-50">
                      {basePrice}
                    </del>
                    <span className="inline-block rounded font-bold text-xs md:text-sm bg-skin-tree bg-opacity-20 text-skin-tree uppercase px-2 py-1 ms-2.5">
                      {discount} {t('text-off')}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={variation}
                variations={variations}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            );
          })}

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            <Counter
              variant="single"
              value={selectedQuantity}
              onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
              disabled={
                !item || isInCart(item?.id || 0)
                  ? getItemFromCart(item?.id || 0).quantity +
                      selectedQuantity >=
                    Number(item?.stock)
                  : selectedQuantity >= Number(item?.stock)
              }
            />
            <Button
              onClick={addToCart}
              className="w-full px-1.5"
              disabled={!isSelected}
              loading={addToCartLoader}
            >
              <IoCartOutline
                color="#ffffff"
                className="me-3 w-[24px] h-[24px]"
              />
              {t('text-add-to-cart')}
            </Button>
            <Button
              variant="border"
              onClick={addToWishlist}
              loading={addToWishlistLoader}
              className={`w-full group hover:text-skin-primary ${
                favorite === true && 'text-skin-primary'
              }`}
            >
              {favorite === true ? (
                <IoIosHeart className="text-2xl md:text-[26px] me-2 transition-all" />
              ) : (
                <IoIosHeartEmpty className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary" />
              )}

              {t('text-wishlist')}
            </Button>
          </div>
          {product?.tag && (
            <ul className="pt-5 xl:pt-6">
              <li className="text-sm md:text-base text-skin-base text-opacity-80 inline-flex items-center justify-center align-middle me-2 relative">
                {t('text-tags')}:
              </li>
              {product?.tag?.map((item: any) => (
                <li className="inline-block p-[3px]" key={item.id}>
                  <Tag name={item.name[language]} slug={item.slug} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSingleDetails;
