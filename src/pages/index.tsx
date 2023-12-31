import Layout from '@components/layout/layout';
import Container from '@components/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { homeFourHeroBanner as heroBanner } from '@framework/static/banner';
import HeroBannerCard from '@components/hero/hero-banner-card';
import { GetStaticProps } from 'next';
import { Element } from 'react-scroll';
import AllProductFeed from '@components/product/feeds/all-products-feed';
import BannerAllCarousel from '@components/banner-carousel';
import { bannerDiscount } from '@framework/static/banner';
import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/http';
import { fetchProducts } from '@framework/product/get-all-products';
import { fetchCategories } from '@framework/category/get-all-categories';
import { LIMITS } from '@framework/utils/http';

export default function Home() {
  return (
    <>
      <HeroBannerCard
        banner={heroBanner}
        className="min-h-[400px] lg:min-h-[450px] 2xl:min-h-[480px] pt-20 lg:pt-32 pb-14 lg:pb-24 mb-7 md:mb-8 xl:mb-10"
      />
      <Container>
        <Element name="grid" className="flex mb-7 pb-2.5">
          <CategoryDropdownSidebar className="flex-shrink-0 pe-8 xl:pe-16 hidden lg:block w-80 xl:w-[400px]" />
          <div className="minimal-main-content w-full xl:-ms-8">
            <BannerAllCarousel
              data={bannerDiscount}
              className="mb-12 xl:mb-14"
            />
            <AllProductFeed />
          </div>
        </Element>
      </Container>
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.PRODUCTS, { limit: LIMITS.PRODUCTS_LIMITS }],
    fetchProducts
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
