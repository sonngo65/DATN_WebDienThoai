package com.DATN.WebBanDienThoai.payload;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductSaleStatistic {
	private Long totalSaleProducts;
	private Long totalOrders;
	private Long totalErning;
	private List<OrderResponse> orders;
}
