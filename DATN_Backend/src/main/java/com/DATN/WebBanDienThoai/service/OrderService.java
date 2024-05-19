package com.DATN.WebBanDienThoai.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.DATN.WebBanDienThoai.entity.ReceiveInfo;
import com.DATN.WebBanDienThoai.payload.OrderRequest;
import com.DATN.WebBanDienThoai.payload.OrderResponse;
import com.DATN.WebBanDienThoai.payload.PageResponse;

public interface OrderService {
	ReceiveInfo save(OrderRequest orderRequest);
	PageResponse findAllByOrderByOrderDate( Integer pageNo, Integer pageSize, String sortBy);
	List<OrderResponse> findAllByAccountId(UUID accountId);
	OrderResponse updateStatus(UUID orderId,int status);
	PageResponse findAllByDurationTime(Date timeStart, Date timeEnd, Integer pageNo, Integer pageSize, String sortBy);
}
