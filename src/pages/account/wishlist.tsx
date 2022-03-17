import Layout from '@components/layout/layout';
import AccountLayout from '@components/account/account-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import WishlistCard from '@components/wishlist/wishlist-card';
import Alert from '@components/alert';
import ProductCardLoader from '@components/loaders/product-card-loader';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';

export default function WishList() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useWishlistProductsQuery({
    limit: 35,
  });

  return (
    <>
      <Seo
        title="Wishlist"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="account/wishlist"
      />
      <AccountLayout>
        <h2 className="text-base md:text-lg xl:text-[20px] font-semibold text-skin-base  lg:pt-0">
          {t('common:text-account-wishlist')}
        </h2>

        <div className="flex flex-col pt-8 2xl:pt-12">
          {error ? (
            <Alert message={error?.message} />
          ) : (
            <div className="flex flex-col">
              {isLoading && !data?.length
                ? Array.from({ length: 35 }).map((_, idx) => (
                    <ProductCardLoader
                      key={idx}
                      uniqueKey={`product--key-${idx}`}
                    />
                  ))
                : data?.map((product: any) => (
                    <WishlistCard key={product.id} product={product} />
                  ))}
            </div>
          )}
        </div>
      </AccountLayout>
    </>
  );
}

WishList.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
