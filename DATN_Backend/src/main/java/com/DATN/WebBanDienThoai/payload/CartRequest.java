package com.DATN.WebBanDienThoai.payload;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartRequest {
	private UUID accountId;
	private UUID optionDetailId;
	private int quantity;
}
