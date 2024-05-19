package com.DATN.WebBanDienThoai.payload;

import java.util.List;
import java.util.UUID;

import com.DATN.WebBanDienThoai.entity.PaymentMethod;
import com.DATN.WebBanDienThoai.entity.ReceiveInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
	private ReceiveInfo receiveInfo;
	private UUID paymenMethodId;
	private UUID accountId;
	private List<CartResponse> optionDetailList;
}
