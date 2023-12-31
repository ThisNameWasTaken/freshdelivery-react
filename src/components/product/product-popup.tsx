import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from '@utils/routes';
import Button from '@components/button';
import Counter from '@components/counter';
import { useCart } from '@contexts/cart/cart.context';
import ProductAttributes from '@components/product/product-attributes';
import { generateCartItem } from '@utils/generate-cart-item';
import usePrice from '@framework/product/use-price';
import { groupBy } from 'lodash';
import { i18n, useTranslation } from 'next-i18next';
import ThumbnailCarousel from '@components/carousel/thumbnail-carousel';
import Image from 'next/image';
import Heading from '@components/heading';
import Text from '@components/text';
import Tag from '@components/tag';
import { IoCart } from 'react-icons/io5';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useWindowSize } from 'react-use';
import { useModalAction, useModalState } from '@components/modal/modal.context';
import CloseButton from '@components/close-button';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { productGalleryPlaceholder } from '@assets/placeholders';
import SuggestionsProductFeed from './feeds/suggestions-product-feed';
import useReviews from 'src/hooks/useReviews';
import ReviewForm from '@components/form/review-form';
import ReviewCard from '@components/cards/review-card';

const breakpoints = {
  '1536': {
    slidesPerView: 6,
  },
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
  },
  '640': {
    slidesPerView: 3,
  },
  '360': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

export default function ProductPopup() {
  const { t } = useTranslation('common');
  const language = i18n?.language || 'ro';
  const { data } = useModalState();
  const { width } = useWindowSize();
  const { closeModal } = useModalAction();
  const router = useRouter();
  const { reviews, addReview, isReviewed } = useReviews(data);
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: 'RON',
  });
  const variations = data.variations
    ? groupBy(data.variations, 'attribute.slug')
    : {};
  const { slug, image, name, unit, description, gallery, tag, quantity } = data;
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.PRODUCT}/${slug}`;
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = data?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  const item = generateCartItem(data, selectedVariation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    // setAddToCartLoader(true);
    // setTimeout(() => {
    //   setAddToCartLoader(false);
    // }, 1500);
    addItemToCart(item as any, selectedQuantity);
    toast(t('text-added-bag'), {
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

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${slug}`);
  }

  useEffect(() => setSelectedQuantity(1), [data.id]);

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px] mx-auto p-1 lg:p-0 xl:p-3 bg-skin-fill rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-4 md:px-6 lg:p-8 2xl:p-10 mb-9 lg:mb-2 pt-4 md:pt-7 2xl:pt-10">
          <div className="lg:flex items-start justify-between">
            <div className="xl:flex items-center justify-center overflow-hidden mb-6 md:mb-8 lg:mb-0">
              {!!gallery?.length ? (
                <ThumbnailCarousel gallery={gallery} />
              ) : (
                <div className="w-auto flex items-center justify-center">
                  <Image
                    src={image?.original ?? productGalleryPlaceholder}
                    alt=""
                    width={650}
                    height={590}
                  />
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex flex-col lg:ps-5 xl:ps-8 2xl:ps-10 lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-5">
                <div
                  className="mb-2 md:mb-2.5 block -mt-1.5"
                  onClick={navigateToProductPage}
                  role="button"
                >
                  <h2 className="text-skin-base text-lg md:text-xl xl:text-2xl font-medium transition-colors duration-300 hover:text-skin-primary">
                    {name[language]}
                  </h2>
                </div>
                {unit && isEmpty(variations) ? (
                  <div className="text-sm md:text-base font-medium">{unit}</div>
                ) : (
                  <VariationPrice
                    selectedVariation={selectedVariation}
                    minPrice={data.min_price}
                    maxPrice={data.max_price}
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
                    isInCart(item.id)
                      ? getItemFromCart(item.id).quantity + selectedQuantity >=
                        Number(item.stock)
                      : selectedQuantity >= Number(item.stock)
                  }
                />
                <Button
                  onClick={addToCart}
                  className="w-full px-1.5"
                  disabled={!isSelected}
                  loading={addToCartLoader}
                >
                  <IoCart color="#ffffff" className="me-3 w-[24px] h-[24px]" />
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
              {tag && (
                <ul className="pt-5 xl:pt-6">
                  <li className="text-sm md:text-base text-skin-base text-opacity-80 inline-flex items-center justify-center align-middle me-2 relative">
                    {t('text-tags')}:
                  </li>
                  {tag?.map((item: any) => (
                    <li className="inline-block p-[3px]" key={item.id}>
                      <Tag name={item.name[language]} slug={item.slug} />
                    </li>
                  ))}
                </ul>
              )}

              <div className="pt-6 xl:pt-8">
                <Heading className="mb-3 lg:mb-3.5">
                  {t('text-product-details')}:
                </Heading>
                <Text variant="small">
                  {description[language].split(' ').slice(0, 40).join(' ')}
                  {'...'}
                  <span
                    onClick={navigateToProductPage}
                    role="button"
                    className="text-skin-primary ms-0.5"
                  >
                    {t('text-read-more')}
                  </span>
                </Text>
              </div>
            </div>
          </div>
        </div>
        <RelatedProductFeed
          product={data}
          carouselBreakpoint={breakpoints}
          className="mb-0.5 md:mb-2 lg:mb-3.5 xl:mb-4 2xl:mb-6"
        />
        <SuggestionsProductFeed
          carouselBreakpoint={breakpoints}
          className="mb-0.5 md:mb-2 lg:mb-3.5 xl:mb-4 2xl:mb-6"
        />
        <div className="p-5 px-[40px]">
          {reviews.map((review) => (
            <ReviewCard key={review.id} item={review} />
          ))}
          {!isReviewed && (
            <ReviewForm className="mb-[40px]" addReview={addReview} />
          )}
        </div>
      </div>
    </div>
  );
}
