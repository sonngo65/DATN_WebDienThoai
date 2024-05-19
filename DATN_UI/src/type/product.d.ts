type a = { name: string };
type ChildOption = {
  id?: string;
  name: string;
};

type Option = {
  title: string;
  childOptions: ChildOption[];
};
type OptionDetail = {
  id?: string;
  option1: string | null;
  option2: string | null;
  image: string;
  imagePreview?: string;

  status: number;
  price: number;
  originalPrice: number;
  quantity: number;
};

type Product = {
  id?: string;
  name: string;
  content: string;
  summary: string;
  specification?: string;
  price: number;
  isBestSeller: boolean;
  originalPrice: number;
  endow?: string;
  sticker?: string;
  stickerPreview?: string;
  flashSalePrice?: number;
  img: string;
  imagePreview?: string;

  childImage?: [];
  options: Option[];
  optionDetails: OptionDetail[];
  status?: number;
};
type GetProductResponse = {
  data: Product[];
  status: number;
};
type createProductRequest = Product & {
  parentCategoryId: string;
  parentCategoryName?: string;
  childCategoryId: string[];
  vendorId: string;
  vendorName?: string;
};
