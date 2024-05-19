package com.DATN.WebBanDienThoai.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
	private double totalErning;
	private double totalSales;
	private double erningCompareLastWeek;
	private double salesCompareLastWeek;
}
