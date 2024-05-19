package com.DATN.WebBanDienThoai.service;

import java.util.List;
import java.util.UUID;

import com.DATN.WebBanDienThoai.payload.CategoryDTO;
import com.DATN.WebBanDienThoai.payload.ChildCategory;
import com.DATN.WebBanDienThoai.payload.ChildOptionDTO;
import com.DATN.WebBanDienThoai.payload.ProductsInCategory;

public interface CategoryService {
 	String save(CategoryDTO categoryRequest);
 	String update(CategoryDTO categoryRequest);
	List<CategoryDTO> listAllParent();

	List<CategoryDTO> listAllByParentId(UUID parentId);

	List<CategoryDTO> listAllGroup();
	
	List<CategoryDTO> listAllCategoryIsShow();
	
	ProductsInCategory getProductsInCategory(UUID id);
	
	CategoryDTO findById(UUID id);
	String deleteById(UUID id);
}
