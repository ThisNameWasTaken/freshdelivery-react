import Link from '@components/link';
import Image from 'next/image';
import { useWindowSize } from 'react-use';
import cn from 'classnames';

type BannerProps = {
  banner: any;
  className?: string;
  classNameInner?: string;
};

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

const BannerCard: React.FC<BannerProps> = ({
  banner,
  className,
  classNameInner,
}) => {
  const { width } = useWindowSize();
  const { slug, image } = banner;
  const selectedImage = getImage(width!, image);
  return (
    <div className={cn('mx-auto', className)}>
      <Link
        href={slug}
        className={cn(
          'h-full group flex justify-center relative overflow-hidden',
          classNameInner
        )}
      >
        <Image
          src={selectedImage.url}
          width={selectedImage.width}
          height={selectedImage.height}
          alt=""
          quality={100}
          className={cn('bg-skin-thumbnail object-cover w-full rounded-md')}
        />
      </Link>
    </div>
  );
};

export default BannerCard;
