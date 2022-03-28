import Container from '@components/container';
import Layout from '@components/layout/layout';
import ProductSingleDetails from '@components/product/product';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import Breadcrumb from '@components/breadcrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Divider from '@components/divider';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';

export default function ProductPage() {
  return (
    <>
      <Divider />
      <div className="pt-[64px]">
        <Container>
          <Breadcrumb />
          <ProductSingleDetails />
        </Container>
      </div>

      <RelatedProductFeed />
      <PopularProductFeed />
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
