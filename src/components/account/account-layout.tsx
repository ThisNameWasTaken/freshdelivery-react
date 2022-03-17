import Container from '@components/ui/container';
import AccountNav from '@components/account/account-nav';
import AccountNavMobile from './account-nav-mobile';
import { ROUTES } from '@utils/routes';
import { MdFavoriteBorder } from 'react-icons/md';
import {
  IoBagHandleOutline,
  IoKeyOutline,
  IoLocationOutline,
  IoSettingsOutline,
} from 'react-icons/io5';

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT_SETTING,
    name: 'settings',
    icon: (
      <IoSettingsOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
  {
    slug: ROUTES.ORDERS,
    name: 'text-orders',
    icon: (
      <IoBagHandleOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
  {
    slug: ROUTES.WISHLIST,
    name: 'text-wishlist',
    icon: (
      <MdFavoriteBorder className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
  {
    slug: ROUTES.ADDRESS,
    name: 'text-address',
    icon: (
      <IoLocationOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: 'text-change-password',
    icon: (
      <IoKeyOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
];

const AccountLayout: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Container className="mt-10">
      <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="lg:hidden">
            <AccountNavMobile options={accountMenu} />
          </div>
          <div className="hidden lg:block sticky flex-shrink-0 w-80 xl:w-[385px] me-7 xl:me-8">
            <AccountNav options={accountMenu} />
          </div>

          <div className="w-full mt-4 lg:mt-0 border border-skin-base p-4 sm:p-5 lg:py-8 2xl:py-10 lg:px-9 2xl:px-12 rounded-md">
            {children}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AccountLayout;
