package com.DATN.WebBanDienThoai.payload;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
	private UUID id;
	private String name;
	private double price;
	private double originalPrice;
	private String summary;
	private String content;
	private String specification;

	private String sticker;
	private Double flashSalePrice;
	private String endow;
	private boolean isBestSeller;
	private String img;
	private Integer status;
	private List<String> childImage = new ArrayList<String>();
	private UUID parentCategoryId;
	private String parentCategoryName;
	private List<UUID> childCategoryId;
	private UUID vendorId;
	private String vendorName;
	private List<OptionDTO> options;
	private List<OptionDetailRequest> optionDetails;
}
