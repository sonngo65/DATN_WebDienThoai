type Category = {
  id?: string;
  position?: number;
  show?: boolean;
  name: string;
  image?: string;
  description?: string;
  vendors?: Vendor[];
  childCategories?: Category[];
};

type CreateCategory = {
  name: string;
  image: string;
  vendors: Vendor[];
  childCategories: string[];
};
type Vendor = {
  id?: string;
  show?: boolean;
  name: string;
  image: string;
};
