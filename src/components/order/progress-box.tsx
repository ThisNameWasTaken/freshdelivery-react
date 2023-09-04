import { BiCheck } from 'react-icons/bi';
import Scrollbar from '@components/scrollbar';
import { i18n, useTranslation } from 'next-i18next';
import { Order } from 'src/hooks/useOrders';
import orderStatuses from '../../../public/api/order-status.json';
import dayjs from 'dayjs';

type ProgressProps = {
  order: Order;
};

const ProgressBox: React.FC<ProgressProps> = ({ order }) => {
  const { t } = useTranslation('common');

  const language = i18n?.language || 'ro';

  const diff = dayjs().diff(order.placedAt);

  let status = orderStatuses[1];

  if (diff >= 60 * 1000) {
    status = orderStatuses[2];
  }

  if (diff >= 5 * 60 * 60 * 1000) {
    status = orderStatuses[3];
  }

  if (!status) return <></>;

  return (
    <Scrollbar
      className="w-full h-full"
      options={{
        scrollbars: {
          autoHide: 'never',
        },
      }}
    >
      <div className="flex flex-wrap w-full flex-row pt-8 pb-10">
        {orderStatuses?.map((item, index) => (
          <div className="block w-3/12" key={index}>
            {status?.serial >= item?.serial ? (
              <div className="text-center">
                <div className="relative">
                  <span className="h-[33px] w-[33px] md:h-[55px] md:w-[55px] mx-auto border-solid border-2 md:border-4 border-white flex items-center justify-center bg-skin-primary rounded-full mb-3 z-10 relative">
                    <BiCheck className="text-white" size={25} />
                  </span>
                  <div
                    className={`absolute ${
                      index === 0 ? 'w-1/2 end-0' : 'w-full start-0'
                    } ${
                      orderStatuses?.length - 1 === index && 'w-1/2 start-0'
                    } top-1/2 transform-[1/2] h-[5px] bg-skin-primary`}
                  ></div>
                </div>
                <p className="text-skin-base text-[12px] md:text-[14px] font-medium">
                  {t(item?.name)}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="relative">
                  <span className="h-[33px] w-[33px] md:h-[55px] md:w-[55px] mx-auto border-solid border-2 md:border-4 border-white flex items-center justify-center bg-[#E2E7EC] rounded-full mb-3 z-10 relative">
                    <BiCheck className="text-white" size={25} />
                  </span>
                  <div
                    className={`absolute ${
                      index === 0 ? 'w-1/2 end-0' : 'w-full start-0'
                    } ${
                      orderStatuses?.length - 1 === index && 'w-1/2 start-0'
                    } top-1/2 transform-[1/2] h-[5px] bg-[#E2E7EC]`}
                  ></div>
                </div>
                <p className="text-skin-base text-[12px] md:text-[14px] font-medium">
                  {t(item?.name)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Scrollbar>
  );
};

export default ProgressBox;
