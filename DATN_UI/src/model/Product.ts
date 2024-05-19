export default interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  originalPrice: number;
  flashSalePrice?: number | null;
  summary: string;
  endow: string;
  sticker?: string | null | undefined;
}
