package com.DATN.WebBanDienThoai.payload;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
	private UUID id;
	private AccountResponse account;
	private Date orderedTime;
	private int status;
	private List<CartResponse> products;
}
