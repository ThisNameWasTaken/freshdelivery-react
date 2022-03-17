import Link from '@components/link';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { Drawer } from '@components/drawer/drawer';
import { getDirection } from '@utils/get-direction';
import { useModalAction } from '@components/modal/modal.context';
import { useTranslation } from 'next-i18next';
import {
  IoHomeOutline,
  IoMenuOutline,
  IoPersonOutline,
  IoSearchOutline,
} from 'react-icons/io5';
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});
const AuthMenu = dynamic(() => import('@components/layout/header/auth-menu'), {
  ssr: false,
});
const MobileMenu = dynamic(
  () => import('@components/layout/header/mobile-menu')
);

const BottomNavigation: React.FC = () => {
  const { t } = useTranslation('common');
  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
    toggleMobileSearch,
    isAuthorized,
  } = useUI();
  const { openModal } = useModalAction();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <>
      <div className="lg:hidden fixed z-30 -bottom-0.5 flex items-center justify-between shadow-bottomNavigation body-font bg-skin-fill w-full h-14 px-4 md:px-6 lg:px-8 text-skin-muted pb-0.5">
        <button
          aria-label="Menu"
          className="flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
          onClick={handleMobileMenu}
        >
          <IoMenuOutline className="w-[24px] h-[24px]" />
        </button>
        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          onClick={toggleMobileSearch}
          aria-label="Search Button"
        >
          <IoSearchOutline className="w-[24px] h-[24px]" />
        </button>
        <Link href={ROUTES.HOME} className="flex-shrink-0">
          <span className="sr-only">{t('breadcrumb-home')}</span>
          <IoHomeOutline className="w-[24px] h-[24px]" />
        </Link>
        <CartButton hideLabel={true} iconClassName="text-opacity-100" />
        <AuthMenu
          isAuthorized={isAuthorized}
          href={ROUTES.ACCOUNT}
          btnProps={{
            className: 'flex-shrink-0 focus:outline-none',
            children: <IoPersonOutline className="w-[24px] h-[24px]" />,
            onClick: handleLogin,
          }}
        >
          <IoPersonOutline className="w-[22px] h-[22px]" />
        </AuthMenu>
      </div>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displaySidebar}
        onClose={closeSidebar}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <MobileMenu />
      </Drawer>
    </>
  );
};

export default BottomNavigation;
