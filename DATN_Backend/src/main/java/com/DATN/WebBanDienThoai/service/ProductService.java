package com.DATN.WebBanDienThoai.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.DATN.WebBanDienThoai.entity.Product;
import com.DATN.WebBanDienThoai.payload.DashboardResponse;
import com.DATN.WebBanDienThoai.payload.FlashSaleDTO;
import com.DATN.WebBanDienThoai.payload.PageResponse;
import com.DATN.WebBanDienThoai.payload.ProductDTO;
import com.DATN.WebBanDienThoai.payload.ProductsInCategory;

public interface ProductService {
	boolean save(ProductDTO productRequest);
	PageResponse findAll(Integer pageNo,Integer pageSize, String sortBy);
	ProductDTO getById(UUID id);
	List<ProductsInCategory> getProductsInCategories();
//	ProductsInCategory getProductInCategoryByCategoryId(UUID categoryId);
//	ProductsInCategory getProductInCategoryByCategoryIdAndVendorId(UUID categoryId,UUID vendorId);
	List<ProductDTO> getAllByName(String name,Integer pageNo,Integer pageSize, String sortBy);
	PageResponse getAllByNameSearch(String name,Integer pageNo,Integer pageSize, String sortBy);

	FlashSaleDTO addProductsToFlashSale(FlashSaleDTO flashSaleRequest);
	
	FlashSaleDTO getAllFlashSaleProducts();
	DashboardResponse getDashboard();
	String updateById(UUID id, ProductDTO productRequest);
	String deleteById(UUID id);
	String deleteProductsFromFlashSale();
	List<ProductDTO> getRelatedProductByCategoryId(UUID categoryId,UUID productId);
	PageResponse getProductsByCategoryId(UUID categoryId,UUID vendorId,Integer pageNo,Integer pageSize,String sortBy,Double priceStart,Double priceEnd);
//	PageResponse getProductsByCategoryIdAndVendorId(UUID categoryId,UUID vendorId,Integer pageNo,Integer pageSize,String sortBy);
	List<ProductDTO> test(Integer pageNo,Integer pageSize,String sortBy);
}
