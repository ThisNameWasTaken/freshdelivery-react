import ProductsCarousel from '@components/product/products-carousel';
import { Product } from '@framework/types';
import { LIMITS } from '@framework/utils/http';
import useSuggestedProducts from 'src/hooks/useSuggestedProducts';
import useUser from 'src/hooks/useUser';

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
}) => {
  const suggestedProducts = useSuggestedProducts();
  const user = useUser();

  if (!user) return <></>;

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
