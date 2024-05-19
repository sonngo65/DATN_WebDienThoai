package com.DATN.WebBanDienThoai.payload;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class CartResponse {
	private UUID id;
	private UUID optionDetailId;
	private String name;
	private String optionName;
	private String image;
	private double price;
	private int quantity;
	private int status;
}
