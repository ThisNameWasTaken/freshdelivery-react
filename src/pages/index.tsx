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
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/http';
import { fetchProducts } from '@framework/product/get-all-products';
import { fetchCategories } from '@framework/category/get-all-categories';
import { LIMITS } from '@framework/utils/http';
import { addDoc, collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'src/hooks/firebase';

const getProduct = (index: number) => ({
  tag: [
    {
      slug: 'fast-food',
      id: 1,
      name: {
        ro: 'Fast Food',
        en: 'Fast Food',
      },
    },
  ],
  price: 7.99,
  description:
    'Tăiței instant (82%): făină de grâu, ulei de palmier, amidon modificat, sare, agenți de creștere (carbont de sodiu, carbonat de potasiu). Pudră condimentare (13.5%): pastă de soia miso în pudră (25%) (boabe de soia, orez, sare, orz), potențiatori de aromă: E621, E635, maltodextrină, lactoză din lapte, sare, pudră de soia (boabe de soia, grâu, maltodextrină, sare), zahăr, pudră de usturoi, pudră extract din os de porc, pudră extract de pui (extract de pui, maltodextrină, sare), proteină de porumb hidrolizată (proteină de porumb hidrolizată, sare), pudră de ghimbir, piper negru, ulei de palmier, arpagic, zahăr caramelizat, chilli. Garnitură (4.5%): porumb, morcov, praz.',
  image: {
    id: 1,
    original: `/assets/images/products/p-${index}-1.png`,
    thumbnail: `/assets/images/products/p-${index}-1.png`,
  },
  quantity: 70,
  name: {
    en: 'Instant Ramen',
    ro: 'Ramen instant',
  },
  gallery: [
    {
      original: `/assets/images/products/p-${index}-1.png`,
      id: 1,
      thumbnail: `/assets/images/products/p-${index}-1.png`,
    },
    {
      id: 2,
      original: `/assets/images/products/p-${index}-2.png`,
      thumbnail: `/assets/images/products/p-${index}-2.png`,
    },
    {
      id: 3,
      original: `/assets/images/products/p-${index}-3.png`,
      thumbnail: `/assets/images/products/p-${index}-3.png`,
    },
  ],
  sale_price: 1.69,
  unit: '66g',
  slug: 'instant-ramen',
});

async function addProduct() {
  const productsCollection = collection(db, 'products');

  const { size } = await getDocs(productsCollection);
  const product = getProduct(size + 1);
  const docRef = await addDoc(productsCollection, product);

  console.log(`${product.name.ro} / ${product.name.en} added ${docRef.id}`);
}

export default function Home() {
  return (
    <>
      <button
        style={{
          position: 'fixed',
          zIndex: 99,
          top: 0,
          right: 0,
          padding: '45px 90px',
          fontSize: 90,
          background: '#fff',
          boxShadow: '0 2px 50px #232323',
        }}
        onClick={addProduct}
      >
        Add product
      </button>
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
