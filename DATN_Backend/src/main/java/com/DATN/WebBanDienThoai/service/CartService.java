package com.DATN.WebBanDienThoai.service;

import java.util.List;
import java.util.UUID;

import com.DATN.WebBanDienThoai.entity.Cart;
import com.DATN.WebBanDienThoai.payload.CartRequest;
import com.DATN.WebBanDienThoai.payload.CartResponse;

public interface CartService {
	CartResponse save(CartRequest cartRequest);
	
	List<CartResponse> getByAccountId(UUID accountId);

	String deleteById(UUID id);

	String updateById(UUID id,int quantity);
}
