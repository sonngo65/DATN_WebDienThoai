package com.DATN.WebBanDienThoai.payload;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlashSaleDTO {
	private UUID id;
	private Date endTime;
	private List<ProductDTO> products;
}
