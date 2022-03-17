import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLogoutMutation } from '@framework/auth/use-logout';
import { useTranslation } from 'next-i18next';
import { IoLogOutOutline } from 'react-icons/io5';

type Option = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export default function AccountNav({ options }: { options: Option[] }) {
  const { t } = useTranslation('common');
  const { mutate: logout } = useLogoutMutation();
  const { pathname } = useRouter();
  const newPathname = pathname.split('/').slice(2, 3);
  const mainPath = `/${newPathname[0]}`;
  return (
    <nav className="flex flex-col pb-2 md:pb-6 border border-skin-base rounded-md overflow-hidden">
      {options.map((item) => {
        const menuPathname = item.slug.split('/').slice(2, 3);
        const menuPath = `/${menuPathname[0]}`;

        return (
          <Link key={item.slug} href={item.slug}>
            <a
              className={`flex items-center cursor-pointer text-sm lg:text-base text-skin-base py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 ${
                mainPath === menuPath
                  ? 'bg-skin-two font-medium'
                  : 'font-normal'
              }`}
            >
              <span className="w-9 xl:w-10 flex-shrink-0 flex justify-center">
                {item.icon}
              </span>
              <span className="ps-1.5">{t(item.name)}</span>
            </a>
          </Link>
        );
      })}
      <button
        className="flex items-center text-sm lg:text-base text-skin-base py-3.5 px-3.5 xl:px-4 2xl:px-5 mb-1 cursor-pointer focus:outline-none"
        onClick={() => logout()}
      >
        <span className="w-9 xl:w-10 flex-shrink-0 flex justify-center">
          <IoLogOutOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
        </span>
        <span className="ps-1.5">{t('text-logout')}</span>
      </button>
    </nav>
  );
}
