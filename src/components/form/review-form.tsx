import { useState } from 'react';
import Input from '@components/form/input';
import Button from '@components/button';
import { useForm } from 'react-hook-form';
import TextArea from '@components/form/text-area';
import { useTranslation } from 'next-i18next';
import Heading from '@components/heading';
import Text from '@components/text';
import cn from 'classnames';
import Rating from '@mui/material/Rating';

type ReviewFormProps = {
  className?: string;
  addReview: (review: any) => any;
};

type ReviewFormValues = {
  title?: string;
  comment?: string;
};

const ReviewForm: React.FC<ReviewFormProps> = ({
  className = '',
  addReview,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>();
  const [rating, setRating] = useState(0);

  function onSubmit(values: ReviewFormValues) {
    addReview({
      ...values,
      rating,
    });
  }

  return (
    <div className={cn(className)}>
      <Heading className="mb-2">Write your review</Heading>
      <Text>
        Your email address will not be published. Required fields are marked*
      </Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center mt-5 lg:mt-7 xl:mt-9"
        noValidate
      >
        <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
          <div className="pb-1.5 flex items-center">
            <label className="flex-shrink-0 block text-skin-base text-sm md:text-base leading-none cursor-pointer pe-3">
              {t('forms:label-your-rating')}
            </label>
            <Rating
              precision={0.5}
              onChange={(event, value) => setRating((value || 0) * 2)}
            />
          </div>
          <Input
            label={t('forms:label-title')}
            {...register('title')}
            error={errors?.title?.message}
            variant="solid"
          />
          <TextArea
            variant="solid"
            label="forms:label-comment"
            {...register('comment')}
            error={errors?.comment?.message}
          />
          <div className="pt-1">
            <Button
              type="submit"
              className="h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto"
            >
              {t('common:button-submit')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
