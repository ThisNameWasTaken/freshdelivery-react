import { useOrderQuery } from '@framework/order/get-order';
import usePrice from '@framework/product/use-price';
import { OrderItem } from '@framework/types';
import { useRouter } from 'next/router';
import { i18n, useTranslation } from 'next-i18next';
import Heading from '@components/heading';
const OrderItemCard = ({ product }: { product: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: 'RON',
  });
  const language = i18n?.language || 'ro';

  return (
    <tr
      className="border-b font-normal border-skin-base last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.name[language]} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};
const OrderDetails: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useTranslation('common');
  const {
    query: { id },
  } = useRouter();
  const { data: order, isLoading } = useOrderQuery(id?.toString()!);
  const { price: subtotal } = usePrice(
    order && {
      amount: order.total,
      currencyCode: 'RON',
    }
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={className}>
      <Heading variant="heading" className="mb-6 xl:mb-7">
        {t('text-order-details')}:
      </Heading>
      <table className="w-full text-skin-base font-semibold text-sm lg:text-base">
        <thead>
          <tr>
            <th className="bg-skin-secondary p-4 text-start first:rounded-ts-md w-1/2">
              {t('text-product')}
            </th>
            <th className="bg-skin-secondary p-4 text-start last:rounded-te-md w-1/2">
              {t('text-total')}
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.products.map((product, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>
        <tfoot>
          <tr className="odd:bg-skin-secondary">
            <td className="p-4 italic">{t('text-total')}:</td>
            <td className="p-4">{subtotal}</td>
          </tr>
          <tr className="odd:bg-skin-secondary">
            <td className="p-4 italic">{t('text-payment-method')}:</td>
            <td className="p-4">{order?.payment_gateway}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
