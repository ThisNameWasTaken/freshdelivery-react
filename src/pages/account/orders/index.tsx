import React from 'react';
import Layout from '@components/layout/layout';
import AccountLayout from '@components/account/account-layout';
import OrderTable from '@components/order/order-table';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';
import useOrders from 'src/hooks/useOrders';

// props change to orders.

export default function OrdersTablePage() {
  const { orders } = useOrders();
  return (
    <>
      <Seo
        title="Orders"
        description="Get your fresh food delivered to your doorstep."
        path="account/orders"
      />
      <AccountLayout>
        <OrderTable orders={orders} />
      </AccountLayout>
    </>
  );
}

OrdersTablePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
