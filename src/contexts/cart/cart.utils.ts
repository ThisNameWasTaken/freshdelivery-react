export type Item = {
  id: string | number;
  price: number;
  quantity?: number;
  stock?: number;
  [key: string]: any;
};

export interface UpdateItemInput extends Partial<Omit<Item, 'id'>> {}

export function addItemWithQuantity(
  items: Item[],
  item: Item,
  quantity: number
) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");

  let didFindMatch = false;

  const newItems = items.map((existingItem) => {
    if (existingItem.id === item.id) {
      didFindMatch = true;
      return {
        ...existingItem,
        quantity: (existingItem.quantity || 0) + quantity,
      };
    }

    return existingItem;
  });

  if (!didFindMatch) {
    newItems.push({
      ...item,
      quantity,
    });
  }

  return newItems;
}

export function removeItemOrQuantity(
  items: Item[],
  id: Item['id'],
  quantity: number
) {
  return items.reduce((acc: Item[], item) => {
    if (item.id === id) {
      const newQuantity = item.quantity! - quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}

export function addItem(items: Item[], item: Item) {
  return [...items, item];
}

export function getItem(items: Item[], id: Item['id']) {
  return items.find((item) => item.id === id);
}

export function updateItem(
  items: Item[],
  id: Item['id'],
  item: UpdateItemInput
) {
  return items.map((existingItem) =>
    existingItem.id === id ? { ...existingItem, ...item } : existingItem
  );
}

export function removeItem(items: Item[], id: Item['id']) {
  return items.filter((existingItem) => existingItem.id !== id);
}

export function inStock(items: Item[], id: Item['id']) {
  const item = getItem(items, id);
  if (item) return item['quantity']! < item['stock']!;
  return false;
}

export const calculateItemTotals = (items: Item[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.price * item.quantity!,
  }));

export const calculateTotal = (items: Item[]) =>
  items.reduce((total, item) => total + item.quantity! * item.price, 0);

export const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0);

export const calculateUniqueItems = (items: Item[]) => items.length;
