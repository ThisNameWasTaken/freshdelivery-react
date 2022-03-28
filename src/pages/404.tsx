import Layout from '@components/layout/layout';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const backgroundThumbnail = '/assets/images/404-bg.png';
const errorThumbnail = '/assets/images/404.svg';

export default function ErrorPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Seo title="404" path="404" />

      <div
        className="text-center px-12 py-16 sm:py-20 lg:py-24 xl:py-32 flex items-center justify-center bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundThumbnail})`,
        }}
      >
        <div className="max-w-md xl:max-w-lg">
          <Image
            src={errorThumbnail}
            alt={t('error-heading')}
            width={250}
            height={250}
          />

          <h2 className="text-6xl md:text-7xl 2xl:text-8xl font-bold text-skin-base pt-5 xl:pt-9">
            {t('error-heading')}
          </h2>
          <p className="text-base md:text-base 2xl:text-[18px] leading-7 md:leading-8 pt-4 font-medium">
            {t('error-sub-heading')}
          </p>
        </div>
      </div>
    </>
  );
}

ErrorPage.Layout = Layout;

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
