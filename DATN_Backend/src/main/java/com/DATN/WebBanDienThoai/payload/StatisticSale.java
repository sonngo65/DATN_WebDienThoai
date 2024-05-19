package com.DATN.WebBanDienThoai.payload;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticSale{
	private Long sales;
	private Date date;
}
