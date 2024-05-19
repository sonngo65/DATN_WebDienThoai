package com.DATN.WebBanDienThoai.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Statistic {
	private Long totalErning;
	private Long totalOrders;
	private Long totalAccounts;
	private Long totalNews;
	private Long totalCategories;
	private Long totalProducts;
}
