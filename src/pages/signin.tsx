import Layout from '@components/layout/layout';
import LoginForm from '@components/auth/login-form';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';

export default function SignInPage() {
  return (
    <>
      <Seo
        title="Sign In"
        description="Get your fresh food delivered to your doorstep."
        path="signin"
      />
      <Divider />
      <div className="flex justify-center items-center">
        <div className="py-12 sm:py-16 lg:py-20">
          <LoginForm
            isPopup={false}
            className="border border-skin-base rounded-lg"
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

SignInPage.Layout = Layout;

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
