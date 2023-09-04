import { Table } from '@components/table';
import Input from '@components/form/input';
import { useState } from 'react';
import Pagination from '@components/pagination';
import { TotalPrice } from '@components/order/price';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { BsSearch } from 'react-icons/bs';
import { Order } from 'src/hooks/useOrders';
import orderStatus from '../../../public/api/order-status.json';
import { useUI } from '@contexts/ui.context';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const CreatedAt: React.FC<{ createdAt?: any }> = ({ createdAt }) => {
  return (
    <span className="whitespace-nowrap">
      {dayjs.utc(createdAt).tz(dayjs.tz.guess()).fromNow()}
    </span>
  );
};

export const Status: React.FC<{ item?: any }> = ({ item }) => {
  const diff = dayjs().diff(item.placedAt);

  let status = orderStatus[1];

  if (diff >= 60 * 1000) {
    status = orderStatus[2];
  }

  if (diff >= 5 * 60 * 60 * 1000) {
    status = orderStatus[3];
  }

  if (!status) return <></>;

  return (
    <span className={status.name}>
      <span className="bullet" style={{ backgroundColor: status.color }} />
      {status.name}
    </span>
  );
};

const columns = [
  {
    title: 'Order Id',
    dataIndex: 'id',
    key: 'id',
    className: 'id-cell',
  },
  {
    title: 'Order Date',
    dataIndex: 'placedAt',
    key: 'placedAt',
    render: function createdAt(order: Order) {
      return <CreatedAt createdAt={order} />;
    },
  },
  {
    title: 'Status',
    key: 'status',
    render: function status(order: Order) {
      return <Status item={order} />;
    },
  },
  {
    title: 'Total Price',
    key: 'total',
    render: function totalPrice(order: Order) {
      return <TotalPrice items={order.items} />;
    },
  },
];

const OrderTable: React.FC<{ orders?: Order[] | null }> = ({ orders }) => {
  const { openDrawer, setDrawerView } = useUI();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const countPerPage = 5;
  const to = countPerPage * currentPage;
  const from = to - countPerPage;
  const filterData = !filter
    ? orders
    : orders?.filter((item) =>
        item.id.toLowerCase().includes(filter.toLowerCase())
      );
  const paginatedData = filterData?.slice(from, to);

  const updatePage = (p: number) => {
    setCurrentPage(p);
  };

  const onChangeSearch = (e: any) => {
    setCurrentPage(1);
    setFilter(e.target.value);
  };

  const onSubmitHandle = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="md:flex md:justify-between items-center mb-5 sm:mb-10">
        <h2 className="font-semibold text-sm md:text-xl text-skin-base mb-4 md:mb-0">
          My order list
        </h2>
        <form onSubmit={onSubmitHandle} className="relative">
          <span className="absolute end-3 top-[80%] transform -translate-y-1/2 order-icon-color">
            <BsSearch size={19} />
          </span>
          <Input
            name="search"
            type="search"
            value={filter}
            onChange={onChangeSearch}
            placeholder="Search Order list"
            inputClassName=" h-[46px] w-full placeholder-[rgba(0, 0, 0, .3)] bg-white border border-[#E3E8EC] rounded-md order-search focus:border-2 focus:outline-none focus:border-skin-primary"
          />
        </form>
      </div>
      <div className="order-list-table-wraper">
        <Table
          className="order-list-table"
          columns={columns}
          data={paginatedData}
          rowKey="id"
          onRow={(data, index) => ({
            onClick() {
              setDrawerView('ORDER_DETAILS');
              const order = data;
              openDrawer(order);
            },
          })}
        />
      </div>
      {!filter.trim() && (
        <div className="text-end mt-5">
          <Pagination
            current={currentPage}
            onChange={updatePage}
            pageSize={countPerPage}
            total={orders?.length}
            prevIcon={<GrPrevious size={12} style={{ color: '#090B17' }} />}
            nextIcon={<GrNext size={12} style={{ color: '#090B17' }} />}
            className="order-table-pagination"
          />
        </div>
      )}
    </>
  );
};

export default OrderTable;
