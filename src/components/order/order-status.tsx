import { useOrderStatusQuery } from '@framework/order/order-status';
import ProgressBox from './progress-box';

type Props = {
  status: number;
};

const OrderStatus = ({ status }: Props) => {
  const { data, isLoading } = useOrderStatusQuery();
  return !isLoading ? (
    <ProgressBox data={data} status={status} />
  ) : (
    <div>Loading...</div>
  );
};

export default OrderStatus;
