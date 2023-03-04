import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Heading from '@components/heading';
import Text from '@components/text';
import Rating from '@mui/material/Rating';

type ReviewProps = {
  item: any;
  className?: string;
};

const ReviewCard: FC<ReviewProps> = ({ item, className = '' }) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={`border-b border-skin-base last:border-0 pb-6 mb-6 last:mb-0 ${className}`}
    >
      <div className="flex mb-1">
        <Heading className="mr-2">{item.title}</Heading>
        <Rating value={item.rating / 2} precision={0.5} readOnly />
      </div>
      <Text className="xl:leading-[2em]">{item.comment}</Text>
      <div className="text-skin-base text-opacity-80 text-sm pt-2">
        <span className="inline-block">{t('text-by')}</span>{' '}
        <span className="inline-block font-semibold">{item.username}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
