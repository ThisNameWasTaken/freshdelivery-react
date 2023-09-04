import { OrderDetailsContent } from './order-details-content';
import { formatAddress } from '@utils/format-address';
import OrderStatus from './order-status';
import {
  DiscountPrice,
  DeliveryFee,
  TotalPrice,
  SubTotalPrice,
} from '@components/order/price';

import { useUI } from '@contexts/ui.context';
import { Order } from 'src/hooks/useOrders';

const OrderDrawer: React.FC = () => {
  const ui = useUI();
  const order = ui.data as Order;

  return (
    <>
      {order && (
        <>
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-8">Order Details</h2>
            <div className="text-[14px] opacity-70 mb-3 text-skin-base">
              Delivery Address
            </div>
            <div className="rounded border border-solid min-h-[90px] bg-skin-two p-4 border-skin-two text-[12px] md:text-[14px]">
              <p className="text-skin-base opacity-70">
                {order.deliveryAddress}
              </p>
            </div>
            <OrderStatus order={order} />
            <div className="grid grid-cols-12 bg-skin-two py-3 rounded-[3px] text-black text-[12px] md:text-[14px]">
              <div className="col-span-2 opacity-50"></div>
              <div className="col-span-5 opacity-50">Items Name</div>
              <div className="col-span-3 opacity-50 md:text-start text-center">
                Quantity
              </div>
              <div className="col-span-2 opacity-50">Price</div>
            </div>
            {order?.items?.map((item) => (
              <OrderDetailsContent key={item.id} item={item} />
            ))}
            <div className="mt-3 text-end">
              <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
                <p className="flex justify-between ps-20 mb-2">
                  <span className="me-8">Total Cost:</span>
                  <span className="font-medium">
                    <TotalPrice items={order.items} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDrawer;
