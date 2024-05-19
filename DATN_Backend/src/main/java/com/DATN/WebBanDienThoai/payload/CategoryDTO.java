package com.DATN.WebBanDienThoai.payload;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.DATN.WebBanDienThoai.entity.Vendor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor

@NoArgsConstructor
public class CategoryDTO {
	private UUID id;
	private String name;
	private String image;
	private boolean isShow;
	private Integer position;
	private String description;
	private List<VendorDTO> vendors;
	private List<CategoryDTO> childCategories = new ArrayList<CategoryDTO>();
}
