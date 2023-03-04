import Container from '@components/container';
import Layout from '@components/layout/layout';
import OrderInformation from '@components/order/order-information';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Divider from '@components/divider';
import { useEffect } from 'react';
import { useCart } from '@contexts/cart/cart.context';
import Seo from '@components/seo/seo';
import { ROUTES } from '@utils/routes';

export default function Order() {
  const { resetCart } = useCart();
  useEffect(() => {
    // resetCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Seo
        title="Order"
        description="Complete your order"
        path={ROUTES.ORDER}
      />
      <Divider />
      <Container>
        <OrderInformation />
      </Container>
      <Divider />
    </>
  );
}

Order.Layout = Layout;

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
