import { useEffect } from 'react';
import ProductCard from '@components/product/product-cards/product-card';
import type { FC } from 'react';
import ProductCardLoader from '@components/loaders/product-card-loader';
import SectionHeader from '@components/section-header';
import { useModalAction } from '@components/modal/modal.context';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { LIMITS } from '@framework/utils/http';
import { Product } from '@framework/types';
import useProducts from 'src/hooks/useProducts';
import useRelatedProducts from 'src/hooks/useRelatedProducts';
type ProductFeedProps = {
  element?: any;
  className?: string;
};
const AllProductFeed: FC<ProductFeedProps> = ({ element, className = '' }) => {
  const { t } = useTranslation('common');

  const { query } = useRouter();
  const products = useProducts();
  const { relatedProducts, setTargetProduct } = useRelatedProducts();

  useEffect(() => {
    setTargetProduct(products[0]);
  }, [products, setTargetProduct]);

  const { openModal } = useModalAction();

  function handleCategoryPopup() {
    openModal('CATEGORY_VIEW');
  }

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between pb-0.5 mb-4 lg:mb-5 xl:mb-6">
        <SectionHeader
          sectionHeading={t('text-all-products')}
          className="mb-0"
        />
        <div
          className="lg:hidden transition-all text-skin-primary -mt-1.5 font-semibold text-sm md:text-base hover:text-skin-base"
          role="button"
          onClick={handleCategoryPopup}
        >
          {t('text-categories')}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5">
        {products.length === 0
          ? Array.from({ length: LIMITS.PRODUCTS_LIMITS }).map((_, i) => (
              <ProductCardLoader key={i} />
            ))
          : products
              .filter(
                (product: Product) =>
                  !query.category ||
                  product.tag?.find((tag) => tag.slug === query.category)
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
      </div>
    </div>
  );
};

export default AllProductFeed;
