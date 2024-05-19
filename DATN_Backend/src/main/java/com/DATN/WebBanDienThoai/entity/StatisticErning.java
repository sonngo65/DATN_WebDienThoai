package com.DATN.WebBanDienThoai.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticErning {
	private Double erning;
	private Date date;
}
