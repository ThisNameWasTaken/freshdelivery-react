import isEmpty from 'lodash/isEmpty';
type Item = {
  id: string | number;
  name: { [key: string]: string };
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
};
type Variation = {
  id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
};
export function generateCartItem(item?: Item, variation?: Variation) {
  if (!item) return {};
  const { id, name, slug, image, price, sale_price, quantity, unit } = item;
  if (variation && !isEmpty(variation)) {
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      name,
      slug,
      unit,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: image?.thumbnail,
      variationId: variation.id,
    };
  }
  return {
    id,
    name,
    slug,
    unit,
    image: image?.thumbnail,
    stock: quantity,
    price: sale_price ? sale_price : price,
  };
}
