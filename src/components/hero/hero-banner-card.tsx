import type { FC } from 'react';
import cn from 'classnames';
import Link from '@components/link';
import { useWindowSize } from 'react-use';
import { useTranslation } from 'next-i18next';
import Search from '@components/search/search';

type BannerProps = {
  banner?: any;
  className?: string;
};

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

const HeroBannerCard: FC<BannerProps> = ({
  banner,
  className = 'py-20 xy:pt-24',
}) => {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  const { title, description, image } = banner;
  const selectedImage = getImage(width!, image);
  return (
    <div
      className={cn(
        'w-full bg-skin-thumbnail bg-no-repeat bg-cover bg-center flex items-center',
        className
      )}
      style={{
        backgroundImage: `url('${selectedImage.url}')`,
      }}
    >
      <div
        className={cn(
          'mx-auto h-full flex flex-col text-center px-6 max-w-[550px] md:max-w-[750px] xl:max-w-[850px] 2xl:max-w-[950px]'
        )}
      >
        <div className="text-center">
          <h2
            className={cn(
              'text-3xl md:text-4xl font-manrope font-extrabold leading-snug md:leading-tight xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 -mt-2 xl:-mt-3 2xl:-mt-4 text-skin-secondary xl:text-5xl 2xl:text-[55px]'
            )}
          >
            {t(title)}
          </h2>
          <p
            className={cn(
              'text-base md:text-[17px] xl:text-lg leading-7 md:leading-8 xl:leading-[1.92em] xl:px-16 text-skin-base text-opacity-80 2xl:px-32'
            )}
          >
            {t(description)}
          </p>
          {banner.btnText && (
            <Link
              href={banner.btnUrl}
              className="h-[45px] mt-7 md:mt-8 text-sm inline-flex items-center justify-center transition duration-300 rounded px-6 py-2 font-semibold bg-skin-inverted text-skin-base hover:text-skin-inverted hover:bg-skin-primary"
            >
              {t(banner.btnText)}
            </Link>
          )}
          {banner.searchBox && (
            <div className="hidden lg:flex max-w-[620px] mx-auto md:pt-1 lg:pt-3">
              <Search />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroBannerCard;
