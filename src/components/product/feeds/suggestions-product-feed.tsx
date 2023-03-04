import ProductsCarousel from '@components/product/products-carousel';
import { Product } from '@framework/types';
import { LIMITS } from '@framework/utils/http';
import useSuggestedProducts from 'src/hooks/useSuggestedProducts';

type SuggestionsProductProps = {
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
  product?: Product;
};

const SuggestionsProductFeed: React.FC<SuggestionsProductProps> = ({
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
  product,
}) => {
  const suggestedProducts = useSuggestedProducts();

  return (
    <ProductsCarousel
      sectionHeading="text-suggested-product"
      className={className}
      products={suggestedProducts}
      loading={!suggestedProducts}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default SuggestionsProductFeed;
