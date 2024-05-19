package com.DATN.WebBanDienThoai.payload;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountRequest {
	private UUID id;
	private String name;
	private String username;
	private String password;
}
