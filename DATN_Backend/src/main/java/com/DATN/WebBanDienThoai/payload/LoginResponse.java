package com.DATN.WebBanDienThoai.payload;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
	private AccountResponse account;
	private List<CartResponse> carts;
}
