package com.DATN.WebBanDienThoai.payload;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductsInCategory {
	private UUID id;
	private String title;
	private String img;
	private String description;
	private List<ProductDTO> products;
	private List<CategoryDTO> childCates;
	private List<VendorDTO> vendors;
}
