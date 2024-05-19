type OrderRequest = {
  receiveInfo: ReceiveInfo;
  paymentMethodId: string;
  accountId: string;
  optionDetailList: CartResponse[];
};

type ReceiveInfo = {
  name: string;
  phoneNumber: string | any;
  address: string;
  note: string;
};
