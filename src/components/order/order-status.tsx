import { useOrderStatusQuery } from '@framework/order/order-status';
import ProgressBox from './progress-box';
import { Order } from 'src/hooks/useOrders';

type Props = {
  status: number;
};

const OrderStatus: React.FC<{ order: Order }> = ({ order }) => {
  return <ProgressBox order={order} />;
};

export default OrderStatus;
