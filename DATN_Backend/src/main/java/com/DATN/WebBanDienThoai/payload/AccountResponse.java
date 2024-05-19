package com.DATN.WebBanDienThoai.payload;

import java.util.List;
import java.util.UUID;

import com.DATN.WebBanDienThoai.entity.ReceiveInfo;
import com.DATN.WebBanDienThoai.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {
	
	public AccountResponse(UUID id, String username, ReceiveInfo receiveInfo) {
		super();
		this.id = id;
		this.username = username;
		this.receiveInfo = receiveInfo;
	}

	private UUID id;
	private String username;
	private ReceiveInfo receiveInfo;
	private List<?> role;
	private String token;
}
