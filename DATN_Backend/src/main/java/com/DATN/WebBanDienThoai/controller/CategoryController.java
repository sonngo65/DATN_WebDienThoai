package com.DATN.WebBanDienThoai.controller;

import java.util.List;
import java.util.UUID;

import com.DATN.WebBanDienThoai.payload.ChildCategory;
import com.DATN.WebBanDienThoai.payload.ProductsInCategory;
import com.DATN.WebBanDienThoai.payload.TestEntity;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.DATN.WebBanDienThoai.payload.CategoryDTO;
import com.DATN.WebBanDienThoai.service.CategoryService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/categories")
@AllArgsConstructor
@CrossOrigin
public class CategoryController {
	private final CategoryService categoryService;
	
	
	@PostMapping
	public ResponseEntity<String> addCategory(@RequestBody CategoryDTO categoryRequest ){
		String response = categoryService.save(categoryRequest);
		return new ResponseEntity<>(response,HttpStatus.CREATED);
		
	}
	@PutMapping
	public ResponseEntity<String> updateCategory(@RequestBody CategoryDTO categoryRequest){
		String response = categoryService.update(categoryRequest);
		return new ResponseEntity<>(response,HttpStatus.OK);

	}
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> getAllCategory(){
		List<CategoryDTO> categoriesResponse = categoryService.listAllParent();
		return new ResponseEntity<>(categoriesResponse,HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<CategoryDTO> getById(@PathVariable UUID id){
		CategoryDTO categoryResponse = categoryService.findById(id);
		return new ResponseEntity<>(categoryResponse,HttpStatus.OK);
	}
	
	@PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?>  uploadTest(@ModelAttribute TestEntity test){
		return new ResponseEntity<>("upload success",HttpStatus.CREATED);
	}
	
	
	@GetMapping("/child")
	public ResponseEntity<List<CategoryDTO>> getAllChildCategoiesByParentId(@RequestParam("parentId") UUID parentId){
		List<CategoryDTO> childCategories = categoryService.listAllByParentId(parentId);
		return new ResponseEntity<>(childCategories,HttpStatus.OK);
	}
	@GetMapping("/group-child")
	public ResponseEntity<List<CategoryDTO>>  getAllChildCategoriesGroup(){
		List<CategoryDTO> childCategoriesGroups = categoryService.listAllGroup();
		return new ResponseEntity<>(childCategoriesGroups,HttpStatus.OK);
	}
	
	@GetMapping("/show")
	public ResponseEntity<List<CategoryDTO>> getAllCategoryShow(){
		List<CategoryDTO> categoryResponseList = categoryService.listAllCategoryIsShow();
		return new ResponseEntity<>(categoryResponseList,HttpStatus.OK);
	}
	
	@GetMapping("/search/{id}")
	public ResponseEntity<ProductsInCategory> getCategoryInfo(@PathVariable UUID id){
		ProductsInCategory categoryInfo = categoryService.getProductsInCategory(id);
		return new ResponseEntity<>(categoryInfo,HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteById(@PathVariable UUID id){
		String response = categoryService.deleteById(id);
		return new ResponseEntity<>(response,HttpStatus.OK);

	}
}
