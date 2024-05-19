package com.DATN.WebBanDienThoai.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.DATN.WebBanDienThoai.entity.Product;
import com.DATN.WebBanDienThoai.entity.StatisticErning;
import com.DATN.WebBanDienThoai.payload.DashboardResponse;
import com.DATN.WebBanDienThoai.payload.FlashSaleDTO;
import com.DATN.WebBanDienThoai.payload.PageResponse;
import com.DATN.WebBanDienThoai.payload.ProductDTO;
import com.DATN.WebBanDienThoai.payload.ProductsInCategory;
import com.DATN.WebBanDienThoai.payload.StatisticSale;
import com.DATN.WebBanDienThoai.repository.ProductRepository;
import com.DATN.WebBanDienThoai.service.ProductService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/products")
@AllArgsConstructor
@CrossOrigin
public class ProductController {
	private ProductService productServ;
	private final ProductRepository productRepo;

	@PostMapping()
	public ResponseEntity<String> addProduct(@RequestBody ProductDTO productRequest) {
		boolean isSuccess = productServ.save(productRequest);

		if (isSuccess)
			return new ResponseEntity<>("add product successfully", HttpStatus.CREATED);
		else
			return new ResponseEntity<>("add product False", HttpStatus.BAD_REQUEST);

	}

	@GetMapping("/all")
	public ResponseEntity<PageResponse> getAllProduct(@RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "10") Integer pageSize, @RequestParam(defaultValue = "id") String sortBy) {
		PageResponse products = productServ.findAll(pageNo,pageSize,sortBy);
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") UUID id) {
		ProductDTO productResponse = productServ.getById(id);
		return new ResponseEntity<>(productResponse, HttpStatus.OK);
	}

	@GetMapping("/categories")
	public ResponseEntity<List<ProductsInCategory>> getProductForHome() {
		List<ProductsInCategory> productsInCategories = productServ.getProductsInCategories();
		return new ResponseEntity<>(productsInCategories, HttpStatus.OK);
	}

	@GetMapping("/categories/{categoryId}")
	public ResponseEntity<PageResponse> getProductForCategory(@PathVariable("categoryId") UUID categoryId,@RequestParam(required = false) UUID vendorId,@RequestParam(defaultValue = "0", required = true) Integer pageNo,
			@RequestParam( defaultValue = "4" ,required = true) Integer pageSize,
			@RequestParam(defaultValue = "id",required = true) String sortBy,@RequestParam(required = false) Double priceStart,@RequestParam(required = false) Double priceEnd) {
		PageResponse productResponse = productServ.getProductsByCategoryId(categoryId,vendorId, pageNo, pageSize, sortBy,priceStart,priceEnd);
		return new ResponseEntity<>(productResponse, HttpStatus.OK);
	}

//	@GetMapping("/categories/{categoryId}/vendors/{vendorId}")
//	public ResponseEntity<PageResponse> getProductForCategoryAndVendor(
//			@PathVariable("categoryId") UUID categoryId, @PathVariable("vendorId") UUID vendorId,@RequestParam(defaultValue = "0", required = false) Integer pageNo,
//			@RequestParam(defaultValue = "4", required = false) Integer pageSize,
//			@RequestParam(defaultValue = "id",required = false) String sortBy
//			) {
//		PageResponse productResponse = productServ.getProductsByCategoryIdAndVendorId(categoryId,vendorId, pageNo, pageSize, sortBy);
// return new ResponseEntity<>(productResponse, HttpStatus.OK);
//	}

	@GetMapping("/search")
	public ResponseEntity<PageResponse> getProductByNameSearch(
			@RequestParam(defaultValue = "", required = false) String name,
			@RequestParam( defaultValue = "0") Integer pageNo,
			@RequestParam( defaultValue = "8") Integer pageSize,
			@RequestParam(defaultValue = "id") String sortBy) {
		PageResponse productResponseList = productServ.getAllByNameSearch(name,pageNo,pageSize,sortBy);
		return new ResponseEntity<>(productResponseList, HttpStatus.OK);
	}
	@GetMapping
	public ResponseEntity<List<ProductDTO>> getProductByName(
			@RequestParam(defaultValue = "", required = false) String name,
			@RequestParam( required = false) Integer pageNo,
			@RequestParam(required = false) Integer pageSize,
			@RequestParam(required = false) String sortBy) {
		List<ProductDTO> productResponseList = productServ.getAllByName(name,pageNo,pageSize,sortBy);
		return new ResponseEntity<>(productResponseList, HttpStatus.OK);
	}
	@PostMapping("/flash-sale")
	public ResponseEntity<FlashSaleDTO> AddProductsToFlashSale(@RequestBody FlashSaleDTO flashSaleRequest) {
		FlashSaleDTO response = productServ.addProductsToFlashSale(flashSaleRequest);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@DeleteMapping("/flash-sale")
	public ResponseEntity<String> deleteProductFlashSale() {
		String response = productServ.deleteProductsFromFlashSale();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/flash-sale")
	public ResponseEntity<FlashSaleDTO> getAllProductsFlashSale() {
		FlashSaleDTO flashSaleResponse = productServ.getAllFlashSaleProducts();
		return new ResponseEntity<>(flashSaleResponse, HttpStatus.OK);
	}

	@GetMapping("/statistic/sales")
	public ResponseEntity<?> getStatisticSales(@RequestParam("group-time") String groupTime,
			@RequestParam("duration") String duration, @RequestParam(defaultValue = "0 week") String preTime) {
		List<?> response = productRepo.getStatisticSales(groupTime, duration, preTime);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/statistic/erning")
	public ResponseEntity<?> getStatisticErning(@RequestParam("group-time") String groupTime,
			@RequestParam("duration") String duration, @RequestParam(defaultValue = "0 week") String preTime) {
		List<?> response = productRepo.getStatisticErning("day", "Month", "1 Month");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/statistic/all")

	public ResponseEntity<DashboardResponse> getStatisticSales() {
		DashboardResponse response = productServ.getDashboard();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable UUID id, @RequestBody ProductDTO productRequest) {
		String response = productServ.updateById(id, productRequest);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable UUID id) {
		String response = productServ.deleteById(id);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/related-product")
	public ResponseEntity<List<ProductDTO>> getAllProduct(@RequestParam("categoryId") UUID categoryId,
			@RequestParam("productId") UUID productId) {
		List<ProductDTO> productResponseList = productServ.getRelatedProductByCategoryId(categoryId, productId);
		return new ResponseEntity<>(productResponseList, HttpStatus.OK);
	}

	@GetMapping("/test")
	public ResponseEntity<List<ProductDTO>> getAllTest(@RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "10") Integer PageSize, @RequestParam(defaultValue = "id") String sortBy) {
		List<ProductDTO> products = productServ.test(pageNo, PageSize, sortBy);
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

}
