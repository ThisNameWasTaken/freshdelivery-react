import Layout from '@components/layout/layout';
import AccountLayout from '@components/account/account-layout';
import AccountDetails from '@components/account/account-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';

export default function AccountDetailsPage() {
  return (
    <>
      <Seo title="Account Settings" path="account/settings" />
      <AccountLayout>
        <AccountDetails />
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.Layout = Layout;

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
