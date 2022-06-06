import ProductsCarousel from '@components/product/products-carousel';
import { Product } from '@framework/types';
import { LIMITS } from '@framework/utils/http';
import useRelatedProducts from 'src/hooks/useRelatedProducts';

type RelatedProductsProps = {
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
  product?: Product;
};

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
  product,
}) => {
  const { relatedProducts } = useRelatedProducts(product);

  return (
    <ProductsCarousel
      sectionHeading="text-related-products"
      categorySlug="/search"
      className={className}
      products={relatedProducts}
      loading={!relatedProducts}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default RelatedProductFeed;
