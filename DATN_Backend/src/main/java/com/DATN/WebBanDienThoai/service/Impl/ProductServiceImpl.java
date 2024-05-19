package com.DATN.WebBanDienThoai.service.Impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import com.DATN.WebBanDienThoai.entity.*;
import com.DATN.WebBanDienThoai.repository.*;

import org.apache.catalina.connector.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.DATN.WebBanDienThoai.payload.ChildOptionDTO;
import com.DATN.WebBanDienThoai.payload.DashboardResponse;
import com.DATN.WebBanDienThoai.payload.FlashSaleDTO;
import com.DATN.WebBanDienThoai.payload.OptionDTO;
import com.DATN.WebBanDienThoai.payload.OptionDetailRequest;
import com.DATN.WebBanDienThoai.payload.PageResponse;
import com.DATN.WebBanDienThoai.payload.ProductDTO;
import com.DATN.WebBanDienThoai.payload.ProductsInCategory;
import com.DATN.WebBanDienThoai.payload.StatisticSale;
import com.DATN.WebBanDienThoai.payload.VendorDTO;
import com.DATN.WebBanDienThoai.service.CategoryService;
import com.DATN.WebBanDienThoai.service.FileStorageService;
import com.DATN.WebBanDienThoai.service.ProductService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepo;
	private final OptionRepository optionRepo;
	private final OptionDetailRepository optionDetailRepo;
	private final CategoryRepository categoryRepo;
	private final VendorRepository vendorRepository;
	private final CategoryService categoryService;
	private final FileStorageService fileStorageService;
	private final FlashSaleRepository flashSaleRepo;

	@Override
	public boolean save(ProductDTO productRequest) {
		Product product = new Product();

		product.setName(productRequest.getName());
		product.setContent(productRequest.getContent());
		product.setSummary(productRequest.getSummary());
		product.setPrice(productRequest.getPrice());
		product.setOriginalPrice(productRequest.getOriginalPrice());
		product.setBestSell(productRequest.isBestSeller());
		product.setEndow(productRequest.getEndow());
		product.setStickerImage(productRequest.getSticker());
		product.setImage(productRequest.getImg());
		product.setTime(new Date());
		product.setSpecification(productRequest.getSpecification());
		Product productSaved = productRepo.save(product);
		Map<String, Option> childOptionSavedList = new HashMap<String, Option>();

		productRequest.getOptions().stream().forEach((optionRequest) -> {
			Option option = new Option();
			option.setTitle(optionRequest.getTitle());
			option.setProduct(productSaved);
			Option optionSaved = optionRepo.save(option);
			optionRequest.getChildOptions().stream().forEach((childOptionRequest) -> {
				Option childOption = new Option();
				childOption.setName(childOptionRequest.getName());
				childOption.setOption(optionSaved);
				Option childOptionSaved = optionRepo.save(childOption);
				childOptionSavedList.put(childOptionSaved.getName(), childOptionSaved);
			});

		});

		productRequest.getOptionDetails().stream().forEach((optionDetailRequest) -> {
			OptionDetail optionDetail = new OptionDetail();
			Option option1 = childOptionSavedList.get(optionDetailRequest.getOption1());
			Option option2 = childOptionSavedList.get(optionDetailRequest.getOption2());
			optionDetail.setProduct(productSaved);
			optionDetail.setOption1(option1);
			optionDetail.setOption2(option2);
			optionDetail.setPrice(optionDetailRequest.getPrice());
			optionDetail.setOriginPrice(optionDetailRequest.getOriginalPrice());

			optionDetail.setImage(optionDetailRequest.getImage());
			optionDetail.setQuantity(optionDetailRequest.getQuantity());
			optionDetailRepo.save(optionDetail);
		});

		if (productRequest.getVendorId() != null)
			product.setVendor(vendorRepository.findById(productRequest.getVendorId()).get());
		if (productRequest.getParentCategoryId() != null) {
			Category parentCategory = categoryRepo.findById(productRequest.getParentCategoryId()).get();
			parentCategory.getProducts().add(productSaved);
			categoryRepo.save(parentCategory);
		}
		productRequest.getChildCategoryId().stream().forEach((childCategoryId) -> {
			Category childCategory = categoryRepo.findById(childCategoryId).get();
			childCategory.getProducts().add(productSaved);
			categoryRepo.save(childCategory);
		});

		return true;
	}

	@Override
	public ProductDTO getById(UUID id) {
		Product product = productRepo.findById(id).get();
		ProductDTO productResponse = new ProductDTO();
		boolean checkStatus = false;
		productResponse.setId(id);
		productResponse.setName(product.getName());
		productResponse.setContent(product.getContent());
		productResponse.setSummary(product.getSummary());
		productResponse.setSpecification(product.getSpecification());
		productResponse.setPrice(product.getPrice());
		productResponse.setOriginalPrice(product.getOriginalPrice());
		productResponse.setImg(product.getImage() != null ? fileStorageService.getUrl(product.getImage()) : null);
		productResponse.setEndow(product.getEndow());
		productResponse.setSticker(
				product.getStickerImage() != null ? fileStorageService.getUrl(product.getStickerImage()) : null);
		productResponse.setBestSeller(product.isBestSell());
		productResponse.setStatus(2);
		productResponse.setFlashSalePrice(product.getFlashSalePrice());
		productResponse.setOptions(product.getOptions().stream().map((option) -> {
			List<Option> childOptionList = optionRepo.findAllByParentId(option.getId());
			OptionDTO optionResponse = new OptionDTO();

			optionResponse.setTitle(option.getTitle());

			optionResponse.setChildOptions(childOptionList.stream().map((childOption) -> {
				ChildOptionDTO childOptionResponse = new ChildOptionDTO();
				childOptionResponse.setName(childOption.getName());
				return childOptionResponse;
			}).toList());
			return optionResponse;
		}).toList());
		Set<String> imagesOfOptionDetails = new HashSet<String>();
		productResponse.setOptionDetails(product.getOptionDetails().stream().map((optionDetail) -> {
			OptionDetailRequest optionDetailResponse = new OptionDetailRequest();
			optionDetailResponse.setId(optionDetail.getId());
			optionDetailResponse.setOption1(optionDetail.getOption1().getName());
			if (optionDetail.getOption2() != null) {
				optionDetailResponse.setOption2(optionDetail.getOption2().getName());
			}
			optionDetailResponse.setPrice(optionDetail.getPrice());
			optionDetailResponse.setOriginalPrice(optionDetail.getOriginPrice());
			optionDetailResponse.setQuantity(optionDetail.getQuantity());
			if (optionDetail.getQuantity() > 0) {
				productResponse.setStatus(1);
			}
			optionDetailResponse.setImage(fileStorageService.getUrl(optionDetail.getImage()));
			imagesOfOptionDetails.add(fileStorageService.getUrl(optionDetail.getImage()));
			return optionDetailResponse;
		}).toList());

		productResponse.setChildImage(imagesOfOptionDetails.stream().toList());
		productResponse.setChildCategoryId(product.getCategories().stream()
				.filter(category -> category.getCategory() != null).map(category -> category.getId()).toList());

		productResponse.setVendorId(product.getVendor() != null ? product.getVendor().getId() : null);
		productResponse.setVendorName(product.getVendor() != null ? product.getVendor().getName() : null);
		Optional<Category> parentCategory = product.getCategories().stream()
				.filter(category -> category.getCategory() == null).findFirst();
		if (!parentCategory.isEmpty()) {
			productResponse.setParentCategoryId(parentCategory.get().getId());
			productResponse.setParentCategoryName(parentCategory.get().getName());
		}
		return productResponse;
	}

	@Override
	public List<ProductsInCategory> getProductsInCategories() {
		List<Category> categories = categoryRepo.findAllParents();
		return categories.stream().map((category) -> {
			ProductsInCategory productsInCategory = new ProductsInCategory();
			productsInCategory.setId(category.getId());
			productsInCategory.setTitle(category.getName());
			productsInCategory
					.setImg((category.getImage() != null) ? fileStorageService.getUrl(category.getImage()) : null);
			productsInCategory.setProducts(productRepo
					.getProductsByCategoryId(category.getId(), null, null, null, PageRequest.of(0, 20, Sort.by("time").descending()))
					.getContent().stream().map(product -> {
						ProductDTO productResponse = new ProductDTO();
						productResponse.setId(product.getId());
						productResponse.setName(product.getName());
						productResponse.setPrice(product.getPrice());
						productResponse.setOriginalPrice(product.getOriginalPrice());
//				productResponse.setContent(product.getContent());
						productResponse.setSummary(product.getSummary());
						productResponse.setImg(fileStorageService.getUrl(product.getImage()));
						productResponse.setEndow(product.getEndow());
						productResponse.setSticker(
								product.getStickerImage() != null ? fileStorageService.getUrl(product.getStickerImage())
										: null);
						return productResponse;
					}).toList());
			productsInCategory.setChildCates(categoryService.listAllByParentId(category.getId()));

			return productsInCategory;
		}).toList();

	}

//	@Override
//	public ProductsInCategory getProductInCategoryByCategoryId(UUID categoryId) {
//		Category category = categoryRepo.findById(categoryId).get();
//		ProductsInCategory productsInCategory = new ProductsInCategory();
//		productsInCategory.setId(category.getId());
//		productsInCategory.setTitle(category.getName());
//		productsInCategory.setImg((category.getImage() != null && category.getCategory() == null)
//				? fileStorageService.getUrl(category.getImage())
//				: null);
//		productsInCategory.setProducts(category.getProducts().stream().map(product -> {
//			ProductDTO productResponse = new ProductDTO();
//			productResponse.setId(product.getId());
//			productResponse.setName(product.getName());
//			productResponse.setPrice(product.getPrice());
//			productResponse.setOriginalPrice(product.getOriginalPrice());
////			productResponse.setContent(product.getContent());
//			productResponse.setSummary(product.getSummary());
//			productResponse.setImg(fileStorageService.getUrl(product.getImage()));
//			productResponse.setEndow(product.getEndow());
//			productResponse.setBestSeller(product.isBestSell());
//			productResponse.setSticker(
//					product.getStickerImage() != null ? fileStorageService.getUrl(product.getStickerImage()) : null);
//			return productResponse;
//		}).toList());
//		productsInCategory.setChildCates(categoryService.listAllByParentId(category.getId()));
//		productsInCategory.setVendors(category.getVendors().stream().map((vendor) -> {
//			VendorDTO vendorResponse = new VendorDTO();
//			vendorResponse.setId(vendor.getId());
//			vendorResponse.setImage(fileStorageService.getUrl(vendor.getImage()));
//			vendorResponse.setName(vendor.getName());
//			return vendorResponse;
//		}).toList());
//		return productsInCategory;
//	}
//
//	@Override
//	public ProductsInCategory getProductInCategoryByCategoryIdAndVendorId(UUID categoryId, UUID vendorId) {
//		Category category = categoryRepo.findById(categoryId).get();
//		ProductsInCategory productsInCategory = new ProductsInCategory();
//		productsInCategory.setId(category.getId());
//		productsInCategory.setTitle(category.getName());
//		productsInCategory.setImg(category.getImage() != null ? fileStorageService.getUrl(category.getImage()) : null);
//		productsInCategory.setProducts(category.getProducts().stream().filter(product -> {
//			return product.getVendor().getId().equals(vendorId);
//		}).map(product -> {
//			ProductDTO productResponse = new ProductDTO();
//			productResponse.setId(product.getId());
//			productResponse.setName(product.getName());
//			productResponse.setPrice(product.getPrice());
//			productResponse.setOriginalPrice(product.getOriginalPrice());
////			productResponse.setContent(product.getContent());
//			productResponse.setSummary(product.getSummary());
//			productResponse.setImg(fileStorageService.getUrl(product.getImage()));
//			productResponse.setEndow(product.getEndow());
//			productResponse.setBestSeller(product.isBestSell());
//			productResponse.setSticker(
//					product.getStickerImage() != null ? fileStorageService.getUrl(product.getStickerImage()) : null);
//			return productResponse;
//		}).toList());
//		productsInCategory.setChildCates(categoryService.listAllByParentId(category.getId()));
//		productsInCategory.setVendors(category.getVendors().stream().map((vendor) -> {
//			VendorDTO vendorResponse = new VendorDTO();
//			vendorResponse.setId(vendor.getId());
//			vendorResponse.setImage(fileStorageService.getUrl(vendor.getImage()));
//			vendorResponse.setName(vendor.getName());
//			return vendorResponse;
//		}).toList());
//		return productsInCategory;
//	}

	@Override
	public List<ProductDTO> getAllByName(String name, Integer pageNo, Integer pageSize, String sortBy) {
		List<Product> products = productRepo.findAllByName(name);

		return products.stream().map(product -> {
			ProductDTO productResponse = new ProductDTO();
			productResponse.setId(product.getId());
			productResponse.setName(product.getName());
			productResponse.setPrice(product.getPrice());
			productResponse.setOriginalPrice(product.getOriginalPrice());
//			productResponse.setContent(product.getContent());
			productResponse.setSummary(product.getSummary());
			productResponse.setImg(fileStorageService.getUrl(product.getImage()));
			productResponse.setEndow(product.getEndow());
			productResponse.setSticker(
					product.getStickerImage() != null ? fileStorageService.getUrl(product.getStickerImage()) : null);
			
			return productResponse;
		}).toList();

	}

	@Override
	public PageResponse getAllByNameSearch(String name, Integer pageNo, Integer pageSize, String sortBy) {
		PageResponse pageResponse = new PageResponse();
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		Page<Product> pageResult = productRepo.findAllByName(name, paging);
		pageResponse.setPageData(pageResult.getContent().stream().map(product -> {
			ProductDTO productResponse = new ProductDTO();
			productResponse.setId(product.getId());
			productResponse.setName(product.getName());
			productResponse.setPrice(product.getPrice());
			productResponse.setOriginalPrice(product.getOriginalPrice());
//				productResponse.setContent(product.getContent());
			productResponse.setSummary(product.getSummary());
			productResponse.setImg(fileStorageService.getUrl(product.getImage()));
			productResponse.setEndow(product.getEndow());
			productResponse.setSticker(
					product.getStickerImage() != null ? fileStorageService.getUrl(product.getStickerImage()) : null);
			productResponse.setOptionDetails(product.getOptionDetails().stream().map(optionDetail -> {
				OptionDetailRequest optionDetailResponse = new OptionDetailRequest();
				optionDetailResponse.setId(optionDetail.getId());
				optionDetailResponse.setImage(optionDetail.getImage());
				optionDetailResponse
						.setOption1(optionDetail.getOption1() != null ? optionDetail.getOption1().getName() : null);
				optionDetailResponse
						.setOption2(optionDetail.getOption2() != null ? optionDetail.getOption2().getName() : null);
				optionDetailResponse.setPrice(optionDetail.getPrice());
				optionDetailResponse
						.setOriginalPrice(optionDetail.getOriginPrice() != null ? optionDetail.getOriginPrice() : 0);
				optionDetailResponse.setQuantity(optionDetail.getQuantity());
				optionDetailResponse.setStatus(optionDetail.getStatus());
				return optionDetailResponse;
			}).toList());
			return productResponse;
		}).toList());
		pageResponse.setTotalPages(pageResult.getTotalPages());
		return pageResponse;
	}

	@Override
	public FlashSaleDTO addProductsToFlashSale(FlashSaleDTO flashSaleRequest) {
		FlashSale flashSale = new FlashSale();
		flashSale.setEndTime(flashSaleRequest.getEndTime());
		FlashSale savedFlashSale = flashSaleRepo.save(flashSale);
		flashSaleRequest.getProducts().stream().forEach(productRequest -> {
			Product product = productRepo.findById(productRequest.getId()).get();
			product.setFlashSale(savedFlashSale);
			product.setFlashSalePrice(productRequest.getFlashSalePrice());
			product.setPrice(product.getPrice() - productRequest.getFlashSalePrice());
			product.setOriginalPrice(product.getOriginalPrice() - productRequest.getFlashSalePrice());
			product.getOptionDetails().stream().forEach((optionDetail) -> {
				optionDetail.setPrice(optionDetail.getPrice() - productRequest.getFlashSalePrice());
				optionDetail.setOriginPrice(optionDetail.getOriginPrice() - productRequest.getFlashSalePrice());
				optionDetailRepo.save(optionDetail);
			});
			productRepo.save(product);

		});
		flashSaleRequest.setId(savedFlashSale.getId());
		return flashSaleRequest;
	}

	@Override
	public FlashSaleDTO getAllFlashSaleProducts() {
		if (flashSaleRepo.findAll().size() <= 0) {
			return null;
		}
		FlashSale flashSale = flashSaleRepo.findAll().get(0);
		FlashSaleDTO flashSaleResponse = new FlashSaleDTO();
		flashSaleResponse.setId(flashSale.getId());
		flashSaleResponse.setEndTime(flashSale.getEndTime());
		flashSaleResponse.setProducts(flashSale.getProducts().stream().map(product -> {
			ProductDTO productResponse = new ProductDTO();
			productResponse.setId(product.getId());
			productResponse.setName(product.getName());
			productResponse.setPrice(product.getPrice());
			productResponse.setOriginalPrice(product.getOriginalPrice());
//			productResponse.setContent(product.getContent());
			productResponse.setSummary(product.getSummary());
			productResponse.setFlashSalePrice(product.getFlashSalePrice() != null ? product.getFlashSalePrice() : null);
			productResponse.setImg(fileStorageService.getUrl(product.getImage()));
			productResponse.setEndow(product.getEndow());
			productResponse.setSticker(
					product.getStickerImage() != null ? fileStorageService.getUrl(product.getStickerImage()) : null);
			return productResponse;
		}).toList());

		return flashSaleResponse;
	}

	@Override
	public DashboardResponse getDashboard() {
		DashboardResponse dashboardResponse = new DashboardResponse();
		List<StatisticErning> statisticErning = productRepo.getStatisticErning("week", "week", "0 week");
		
		List<StatisticSale> statisticSale =  productRepo.getStatisticSales("week", "week", "0 week");;
		List<StatisticErning> statisticErningList = productRepo.getStatisticErning("week", "week", "1 week");
		List<StatisticSale> statisticSaleList = productRepo.getStatisticSales("week", "week", "1 week");
		dashboardResponse.setTotalErning(statisticErning.size() > 0 ? statisticErning.get(0).getErning() : 0);
		dashboardResponse.setTotalSales(statisticSale.size() > 0? statisticSale.get(0).getSales() : 0);
		if (statisticErningList.size() <= 0) {
			dashboardResponse.setErningCompareLastWeek(0);
			dashboardResponse.setSalesCompareLastWeek(0);
			return dashboardResponse;

		}
		if (statisticErningList.size() <= 1) {

			Date date = new Date(System.currentTimeMillis() - 1000 * 60 * 60 * 24 * 7);
			if (date.after(statisticErningList.get(0).getDate())) {
				dashboardResponse.setErningCompareLastWeek(-statisticErningList.get(0).getErning());
				dashboardResponse.setSalesCompareLastWeek(-statisticSaleList.get(0).getSales());
			} else {
				dashboardResponse.setErningCompareLastWeek(statisticErningList.get(0).getErning());
				dashboardResponse.setSalesCompareLastWeek(statisticSaleList.get(0).getSales());
			}
			return dashboardResponse;

		}
		dashboardResponse.setErningCompareLastWeek(
				statisticErningList.get(0).getErning() - statisticErningList.get(1).getErning());
		dashboardResponse
				.setSalesCompareLastWeek(statisticSaleList.get(0).getSales() - statisticSaleList.get(1).getSales());
		return dashboardResponse;
	}

	@Override
	public PageResponse findAll(Integer pageNo, Integer pageSize, String sortBy) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		Page<Product> pageResult = productRepo.findAllByOrderByIdAsc(paging);
		List<ProductDTO> productDTOList = pageResult.getContent().stream().map(product -> {
			ProductDTO productResponse = new ProductDTO();
			productResponse.setId(product.getId());
			productResponse.setName(product.getName());
			productResponse.setOptionDetails(product.getOptionDetails().stream().map(optionDetail -> {
				OptionDetailRequest optionDetailResponse = new OptionDetailRequest();
				optionDetailResponse.setId(optionDetail.getId());
				optionDetailResponse.setImage(optionDetail.getImage());
				optionDetailResponse
						.setOption1(optionDetail.getOption1() != null ? optionDetail.getOption1().getName() : null);
				optionDetailResponse
						.setOption2(optionDetail.getOption2() != null ? optionDetail.getOption2().getName() : null);
				optionDetailResponse.setPrice(optionDetail.getPrice());
				optionDetailResponse
						.setOriginalPrice(optionDetail.getOriginPrice() != null ? optionDetail.getOriginPrice() : 0);
				optionDetailResponse.setQuantity(optionDetail.getQuantity());
				optionDetailResponse.setStatus(optionDetail.getStatus());
				return optionDetailResponse;
			}).toList());
			return productResponse;
		}).toList();
		PageResponse pageResponse = new PageResponse();
		pageResponse.setPageData(productDTOList);
		pageResponse.setTotalPages(pageResult.getTotalPages());
		return pageResponse;
	}

	@Override
	public String updateById(UUID id, ProductDTO productRequest) {
		Optional<Product> oldProductOptional = productRepo.findById(id);
		if (oldProductOptional.isEmpty()) {
			return "can't update product with id = " + id;
		}
		Product oldProduct = oldProductOptional.get();
		oldProduct.setName(productRequest.getName());
		oldProduct.setPrice(productRequest.getPrice());
		oldProduct.setOriginalPrice(productRequest.getOriginalPrice());
		oldProduct.setBestSell(productRequest.isBestSeller());
		oldProduct.setSummary(productRequest.getSummary());
		oldProduct.setContent(productRequest.getContent());
		oldProduct.setSpecification(productRequest.getSpecification());
		oldProduct.setEndow(productRequest.getEndow());
		oldProduct.setStickerImage(fileStorageService.getImageFromUrl(productRequest.getSticker()));
		oldProduct.setImage(fileStorageService.getImageFromUrl(productRequest.getImg()));
		categoryRepo.deleteProductInCategoryById(oldProduct.getId());
		if (productRequest.getVendorId() != null)
			oldProduct.setVendor(vendorRepository.findById(productRequest.getVendorId()).get());
		if (productRequest.getParentCategoryId() != null) {
			Category parentCategory = categoryRepo.findById(productRequest.getParentCategoryId()).get();
			parentCategory.getProducts().add(oldProduct);
			categoryRepo.save(parentCategory);
		}
		productRequest.getChildCategoryId().stream().forEach((childCategoryId) -> {
			Category childCategory = categoryRepo.findById(childCategoryId).get();
			childCategory.getProducts().add(oldProduct);
			categoryRepo.save(childCategory);
		});
		productRequest.getOptionDetails().stream().forEach(optionDetail -> {
			OptionDetail oldOptionDetail = optionDetailRepo.findByNameOption1AndNameOption2(optionDetail.getOption1(),
					optionDetail.getOption2());
			oldOptionDetail.setPrice(optionDetail.getPrice());
			oldOptionDetail.setOriginPrice(optionDetail.getOriginalPrice());
			oldOptionDetail.setQuantity(optionDetail.getQuantity());
			oldOptionDetail.setImage(fileStorageService.getImageFromUrl(optionDetail.getImage()));
			optionDetailRepo.save(oldOptionDetail);
		});
		productRepo.save(oldProduct);
		return "update successfully";
	}

	@Override
	public String deleteById(UUID id) {
		Optional<Product> productOptional = productRepo.findById(id);
		if (productOptional.isEmpty()) {
			return "can't delete product by id = " + id;
		}
		Product product = productOptional.get();
		optionDetailRepo.deleteByProductId(product.getId());
		;

		product.getOptions().stream().forEach(parentOption -> {
			optionRepo.DeleteByParentId(parentOption.getId());
		});
		optionRepo.DeleteByProductId(product.getId());
		categoryRepo.deleteProductInCategoryById(product.getId());
		productRepo.delete(product);
		return "delete Product Successfully";
	}

	@Override
	public String deleteProductsFromFlashSale() {
		List<FlashSale> flashSaleList = flashSaleRepo.findAll();
		flashSaleList.stream().forEach((flashSale) -> {
			flashSale.getProducts().stream().forEach((product) -> {
				product.setPrice(product.getPrice() + product.getFlashSalePrice());
				product.setOriginalPrice(product.getOriginalPrice() + product.getFlashSalePrice());
				product.getOptionDetails().stream().forEach((optionDetail) -> {
					optionDetail.setPrice(optionDetail.getPrice() + product.getFlashSalePrice());
					optionDetail.setOriginPrice(optionDetail.getOriginPrice() + product.getFlashSalePrice());
					optionDetailRepo.save(optionDetail);
				});
				product.setFalseSale(false);
				product.setFlashSale(null);
				product.setFlashSalePrice(null);
				productRepo.save(product);

			});
			flashSaleRepo.delete(flashSale);
		});

		return "Delete All product from flash sale successfully";
	}

	@Override
	public List<ProductDTO> getRelatedProductByCategoryId(UUID categoryId, UUID productId) {
		List<Product> products = productRepo.getRelatedProductsByCategoryId(categoryId, productId);
		List<ProductDTO> productResponseList = products.stream().map(product -> {
			ProductDTO productResponse = new ProductDTO();
			productResponse.setId(product.getId());
			productResponse.setName(product.getName());
			productResponse.setPrice(product.getPrice());
			productResponse.setOriginalPrice(product.getOriginalPrice());
//			productResponse.setContent(product.getContent());
			productResponse.setSummary(product.getSummary());
			productResponse.setFlashSalePrice(product.getFlashSalePrice() != null ? product.getFlashSalePrice() : 0);
			productResponse.setImg(fileStorageService.getUrl(product.getImage()));
			productResponse.setEndow(product.getEndow());
			productResponse.setSticker(
					product.getStickerImage() != null ? fileStorageService.getUrl(product.getStickerImage()) : null);
			return productResponse;
		}).toList();
		return productResponseList;
	}

	@Override
	public List<ProductDTO> test(Integer pageNo, Integer pageSize, String sortBy) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		Page<Product> pagedResult = productRepo.findAll(paging);
		return pagedResult.getContent().stream().map((product) -> {
			ProductDTO productResponse = new ProductDTO();
			productResponse.setId(product.getId());
			productResponse.setName(product.getName());
			productResponse.setImg(product.getImage());

			return productResponse;
		}).toList();
	}

	@Override
	public PageResponse getProductsByCategoryId(UUID categoryId, UUID vendorId, Integer pageNo, Integer pageSize,
			String sortBy, Double priceStart, Double priceEnd) {
		Sort sort = null;
		String[] arr = sortBy.split(":");
		if (sortBy.split(":").length > 1) {
			sort = sortBy.split(":")[1].equals("desc") ? Sort.by(sortBy.split(":")[0]).descending()
					: Sort.by(sortBy.split(":")[0]);
		} else {

			sort = Sort.by(sortBy);
		}
		Pageable paging = PageRequest.of(pageNo, pageSize, sort);
		Page<Product> pagedResult = productRepo.getProductsByCategoryId(categoryId, vendorId, priceStart, priceEnd,
				paging);
		PageResponse pageResponse = new PageResponse();
		pageResponse.setPageData(pagedResult.getContent().stream().map(product -> {
			ProductDTO productResponse = new ProductDTO();
			productResponse.setId(product.getId());
			productResponse.setName(product.getName());
			productResponse.setPrice(product.getPrice());
			productResponse.setOriginalPrice(product.getOriginalPrice());
//		productResponse.setContent(product.getContent());
			productResponse.setSummary(product.getSummary());
			productResponse.setImg(fileStorageService.getUrl(product.getImage()));
			productResponse.setEndow(product.getEndow());
			productResponse.setBestSeller(product.isBestSell());
			productResponse.setSticker(
					product.getStickerImage() != null ? fileStorageService.getUrl(product.getStickerImage()) : null);
			return productResponse;
		}).toList());
		pageResponse.setTotalPages(pagedResult.getTotalPages());
		return pageResponse;
	}

//	@Override
//	public PageResponse getProductsByCategoryIdAndVendorId(UUID categoryId, UUID vendorId, Integer pageNo,
//			Integer pageSize, String sortBy) {
//		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
//		Page<Product> pagedResult = productRepo.getProductsByCategoryIdAndVendorId(categoryId, vendorId, paging);
//
//		PageResponse pageResponse = new PageResponse();
//		pageResponse.setPageData(pagedResult.getContent().stream().map(product -> {
//			ProductDTO productResponse = new ProductDTO();
//			productResponse.setId(product.getId());
//			productResponse.setName(product.getName());
//			productResponse.setPrice(product.getPrice());
//			productResponse.setOriginalPrice(product.getOriginalPrice());
////		productResponse.setContent(product.getContent());
//			productResponse.setSummary(product.getSummary());
//			productResponse.setImg(fileStorageService.getUrl(product.getImage()));
//			productResponse.setEndow(product.getEndow());
//			productResponse.setBestSeller(product.isBestSell());
//			productResponse.setSticker(
//					product.getStickerImage() != null ? fileStorageService.getUrl(product.getStickerImage()) : null);
//			return productResponse;
//		}).toList());
//		pageResponse.setTotalPages(pagedResult.getTotalPages());
//		return pageResponse;
//	}

}
