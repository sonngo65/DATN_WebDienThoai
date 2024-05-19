type CartRequest = {
  id?: string;
  accountId: string;
  optionDetailId: string;
  quantity: number;
};

type CartResponse = {
  id: string;
  optionDetailId: string;
  name: string;
  optionName: string;
  image: string;
  price: number;
  quantity: number;
  status: number;
};
