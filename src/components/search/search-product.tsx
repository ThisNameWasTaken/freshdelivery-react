import Image from 'next/image';
import Link from '@components/link';
import { ROUTES } from '@utils/routes';
import { searchProductPlaceholder } from '@assets/placeholders';
import { i18n } from 'next-i18next';

type SearchProductProps = {
  item: any;
};

const SearchProduct: React.FC<SearchProductProps> = ({ item }) => {
  const language = i18n?.language || 'ro';

  return (
    <Link
      href={`${ROUTES.PRODUCT}/${item?.slug}`}
      className="group w-full h-auto flex justify-start items-center"
    >
      <div className="relative flex w-12 h-12 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
        <Image
          src={item?.image?.thumbnail ?? searchProductPlaceholder}
          width={48}
          height={48}
          loading="eager"
          alt=""
          className="bg-skin-thumbnail object-cover"
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-skin-base text-base">
          {item.name[language]}
        </h3>
      </div>
    </Link>
  );
};

export default SearchProduct;
