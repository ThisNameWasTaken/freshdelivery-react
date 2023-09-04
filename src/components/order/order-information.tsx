import { IoCheckmarkCircle } from 'react-icons/io5';
import OrderDetails from '@components/order/order-details';
import { useRouter } from 'next/router';
import usePrice from '@framework/product/use-price';
import { useTranslation } from 'next-i18next';
import useUser from 'src/hooks/useUser';
import useOrder from 'src/hooks/useOrder';
import dayjs from 'dayjs';

export default function OrderInformation() {
  const {
    query: { id },
  } = useRouter();

  const user = useUser();
  const { t } = useTranslation('common');
  const order = useOrder(id as string);
  const { price: total } = usePrice(
    order && {
      amount: order.items.reduce(
        (sum, { price, quantity }) => sum + price * quantity,
        +(order?.deliveryTip || 0)
      ),
      currencyCode: 'RON',
    }
  );

  return (
    <div className="xl:px-32 2xl:px-44 3xl:px-56 py-16 lg:py-20">
      <div className="border border-skin-base bg-skin-secondary px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-skin-base text-sm md:text-base mb-6 lg:mb-8">
        <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
        </span>
        {t('text-order-received')}
      </div>

      <ul className="border border-skin-base bg-skin-secondary rounded-md flex flex-col md:flex-row mb-7 lg:mb-8 xl:mb-10">
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-skin-two px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-xs block text-skin-muted font-normal leading-5">
            {t('text-order-number')}:
          </span>
          {order?.id}
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            {t('text-date')}:
          </span>
          {dayjs(order?.placedAt).format('DD-MMM-YYYY')}
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            {t('text-email')}:
          </span>
          {user?.email}
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            {t('text-total')}:
          </span>
          {total}
        </li>
        <li className="text-skin-base font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-skin-muted font-normal leading-5">
            {t('text-payment-method')}:
          </span>
          {order?.isPayedFor ? 'Card' : 'Numerar la livrare'}
        </li>
      </ul>

      <OrderDetails />
    </div>
  );
}
