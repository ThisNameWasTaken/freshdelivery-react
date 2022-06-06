import React, { useCallback } from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { Item, getItem, inStock } from './cart.utils';
import { useLocalStorage } from 'react-use';
interface CartProviderState extends State {
  addItemToCart: (item: Item | null | undefined, quantity: number) => void;
  removeItemFromCart: (id: Item['id'] | null | undefined) => void;
  clearItemFromCart: (id: Item['id'] | null | undefined) => void;
  getItemFromCart: (id: Item['id'] | null | undefined) => any | undefined;
  isInCart: (id: Item['id'] | null | undefined) => boolean;
  isInStock: (id: Item['id'] | null | undefined) => boolean;
  resetCart: () => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export const CartProvider: React.FC = (props) => {
  const [savedCart, saveCart] = useLocalStorage(
    `freshdelivery-cart`,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!)
  );

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: Item | null | undefined, quantity: number) =>
    !!item && dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });
  const removeItemFromCart = (id: Item['id'] | null | undefined) =>
    !!id && dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id });
  const clearItemFromCart = (id: Item['id'] | null | undefined) =>
    !!id && dispatch({ type: 'REMOVE_ITEM', id });
  const isInCart = useCallback(
    (id: Item['id'] | null | undefined) => !!id && !!getItem(state.items, id),
    [state.items]
  );
  const getItemFromCart = useCallback(
    (id: Item['id'] | null | undefined) => !!id && getItem(state.items, id),
    [state.items]
  );
  const isInStock = useCallback(
    (id: Item['id'] | null | undefined) => !!id && inStock(state.items, id),
    [state.items]
  );
  const resetCart = () => dispatch({ type: 'RESET_CART' });
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
    }),
    [getItemFromCart, isInCart, isInStock, state]
  );
  return <cartContext.Provider value={value} {...props} />;
};
