package com.DATN.WebBanDienThoai.payload;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse {
	private List<?> pageData;
	private Integer totalPages;
}
