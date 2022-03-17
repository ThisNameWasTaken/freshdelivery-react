import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { siteSettings } from '@settings/site-settings';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { addActiveScroll } from '@utils/add-active-scroll';
import Container from '@components/container';
import Logo from '@components/logo';
import HeaderMenu from '@components/layout/header/header-menu';
import LanguageSwitcher from '@components/language-switcher';
import { useModalAction } from '@components/modal/modal.context';
import cn from 'classnames';
import Search from '@components/search';
import { IoPersonOutline } from 'react-icons/io5';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const { isAuthorized, displayMobileSearch } = useUI();
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-four w-full sticky top-0 z-30',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="innerSticky body-font absolute w-full h-[64px] lg:h-auto z-20 transition duration-200 ease-in-out flex items-center bg-gradient-to-b from-white to-transparent lg:pt-1.5 xl:pb-1.5">
        <Search className="top-bar-search lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1" />
        {/* End of Mobile search */}
        <Container className="flex items-center justify-between lg:justify-center h-full w-full">
          <Logo className="-mt-1" />

          <HeaderMenu
            data={site_header.menu}
            className="hidden lg:flex md:ps-6 xl:ps-10"
          />

          <div className="flex flex-shrink-0 space-s-5 xl:space-s-7 ms-auto">
            <LanguageSwitcher />
            <CartButton className="hidden lg:flex" />
            <div className="hidden lg:flex items-center flex-shrink-0 ">
              <IoPersonOutline className="text-skin-base text-opacity-40 w-[22px] h-[22px]" />
              <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                btnProps={{
                  children: t('text-sign-in'),
                  onClick: handleLogin,
                }}
              >
                {t('text-account')}
              </AuthMenu>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
