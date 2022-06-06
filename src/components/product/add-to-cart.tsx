import Counter from '@components/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import { useState } from 'react';
import { IoCart } from 'react-icons/io5';

type Props = {
  data: any;
  variation?: any;
  disabled?: boolean;
};

export const AddToCart = ({ data, variation, disabled }: Props) => {
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  const item = generateCartItem(data!, variation);
  const [incremented, setIncremented] = useState(false);
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    addItemToCart(item as any, 1);
    if (!incremented) {
      setIncremented(true);
    } else {
      removeItemFromCart(item?.id);
    }
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item?.id);
  };
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  return !isInCart(item?.id) ? (
    <button
      className="bg-skin-primary rounded-full w-8 lg:w-10 h-8 lg:h-10 text-skin-inverted text-4xl flex items-center justify-center focus:outline-none"
      aria-label="Count Button"
      onClick={handleAddClick}
      disabled={disabled || outOfStock}
    >
      <IoCart width={22} height={22} opacity="1" className="scale-[0.6]" />
    </button>
  ) : (
    <Counter
      value={getItemFromCart(item?.id)?.quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      disabled={outOfStock}
    />
  );
};
