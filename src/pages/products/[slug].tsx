import Container from '@components/container';
import Layout from '@components/layout/layout';
import ProductSingleDetails from '@components/product/product';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import Breadcrumb from '@components/breadcrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Divider from '@components/divider';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import { useRouter } from 'next/router';
import useProduct from 'src/hooks/useProduct';
import ReviewCard from '@components/cards/review-card';
import ReviewForm from '@components/form/review-form';
import useReviews from 'src/hooks/useReviews';
import SectionHeader from '@components/section-header';
import { useTranslation } from 'next-i18next';
import SuggestionsProductFeed from '@components/product/feeds/suggestions-product-feed';

export default function ProductPage() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const {
    query: { slug },
  } = router;
  const { product } = useProduct(slug as string);
  const { reviews, addReview, isReviewed } = useReviews(product);

  return (
    <>
      <Divider />
      <div className="pt-[64px]">
        <Container>
          <Breadcrumb />
          <ProductSingleDetails />
        </Container>
      </div>

      <RelatedProductFeed product={product} />
      <SuggestionsProductFeed />

      <SectionHeader
        sectionHeading={t('text-product-reviews')}
        sectionSubHeading={t('text-read-our-customers-opinion')}
        headingPosition="center"
      />
      <div style={{ width: 850, margin: 'auto' }}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} item={review} />
        ))}
        {!isReviewed && (
          <ReviewForm className="mb-[40px]" addReview={addReview} />
        )}
      </div>
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
