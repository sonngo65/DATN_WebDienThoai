package com.DATN.WebBanDienThoai.service.Impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import com.DATN.WebBanDienThoai.entity.Vendor;
import com.DATN.WebBanDienThoai.payload.ChildCategory;
import com.DATN.WebBanDienThoai.payload.ProductDTO;
import com.DATN.WebBanDienThoai.payload.ProductsInCategory;
import com.DATN.WebBanDienThoai.payload.VendorDTO;
import com.DATN.WebBanDienThoai.repository.VendorRepository;
import org.springframework.stereotype.Service;

import com.DATN.WebBanDienThoai.entity.Category;
import com.DATN.WebBanDienThoai.entity.Product;
import com.DATN.WebBanDienThoai.payload.CategoryDTO;
import com.DATN.WebBanDienThoai.repository.CategoryRepository;
import com.DATN.WebBanDienThoai.service.CategoryService;
import com.DATN.WebBanDienThoai.service.FileStorageService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository categoryRepo;
	private final VendorRepository vendorRepository;
	private final FileStorageService fileStorageService;

	@Override
	public String save(CategoryDTO categoryRequest) {
		Category category = new Category();
		category.setName(categoryRequest.getName());
		category.setImage(categoryRequest.getImage());
		category.setDesciption(categoryRequest.getDescription());
		Category savedCategory = categoryRepo.save(category);
		categoryRequest.getChildCategories().stream().forEach(childCategoryRequest -> {
			Category childCategory = new Category();
			childCategory.setCategory(savedCategory);
			childCategory.setName(childCategoryRequest.getName());
			if (childCategoryRequest.getImage() != null) {
				childCategory.setImage(childCategoryRequest.getImage());
			}
			Category childCategorySaved = categoryRepo.save(childCategory);
			childCategoryRequest.getChildCategories().stream().forEach((childCategoryRequest2) -> {
				Category childCategory2 = new Category();
				childCategory2.setCategory(childCategorySaved);
				childCategory2.setName(childCategoryRequest2.getName());
				if (childCategoryRequest2.getImage() != null) {
					childCategory2.setImage(childCategoryRequest2.getImage());
				}
				categoryRepo.save(childCategory2);
			});

		});
		categoryRequest.getVendors().forEach(vendorRequest -> {
			Vendor vendor = new Vendor();
			vendor.setName(vendorRequest.getName());
			vendor.setImage(vendorRequest.getImage());
			vendor.setCategory(savedCategory);
			vendorRepository.save(vendor);
		});

		return "saved Category successfully";
	}

	@Override
	public List<CategoryDTO> listAllParent() {
		List<Category> listCategory = categoryRepo.findAllParents();

		return listCategory.stream().map((category) -> {
			CategoryDTO categoryResponse = new CategoryDTO();
			categoryResponse.setId(category.getId());
			categoryResponse.setImage(category.getImage());
			categoryResponse.setName(category.getName());
			return categoryResponse;
		}).toList();
	}

	@Override
	public List<CategoryDTO> listAllByParentId(UUID parentId) {
		List<CategoryDTO> childCategoryResponseList = new ArrayList<CategoryDTO>();
		categoryRepo.findAllByParentId(parentId).stream().forEach((category -> {
			CategoryDTO childCategory = new CategoryDTO();
			childCategory.setId(category.getId());
			childCategory.setName(category.getName());
			childCategoryResponseList.add(childCategory);
			categoryRepo.findAllByParentId(category.getId()).forEach((category1 -> {
				CategoryDTO childCategory1 = new CategoryDTO();
				childCategory1.setId(category1.getId());
				childCategory1.setName(category1.getName());
				childCategoryResponseList.add(childCategory1);
			}));
		}));

		return childCategoryResponseList;

	}

	@Override
	public List<CategoryDTO> listAllGroup() {
		List<CategoryDTO> childCategoryResponseList = new ArrayList<CategoryDTO>();
		List<Category> categories = categoryRepo.findAllParents();
		categoryRepo.findAllParents().stream().forEach((parentCategory -> {
			CategoryDTO parentCategoryResponse = new CategoryDTO();
			parentCategoryResponse.setId(parentCategory.getId());
			parentCategoryResponse.setName(parentCategory.getName());
			parentCategoryResponse.setImage(parentCategory.getImage());
			categoryRepo.findAllByParentId(parentCategory.getId()).forEach((category -> {
				CategoryDTO childCategory = new CategoryDTO();
				childCategory.setId(category.getId());
				childCategory.setName(category.getName());
				categoryRepo.findAllByParentId(childCategory.getId()).forEach((category1 -> {
					CategoryDTO childCategory1 = new CategoryDTO();
					childCategory1.setName(category1.getName());
					childCategory1.setId(category1.getId());
					childCategory.getChildCategories().add(childCategory1);
				}));
				parentCategoryResponse.getChildCategories().add(childCategory);
			}));
			parentCategoryResponse.setVendors(parentCategory.getVendors().stream().map((vendor) -> {
				VendorDTO vendorDTO = new VendorDTO();
				vendorDTO.setId(vendor.getId());
				vendorDTO.setName(vendor.getName());
				vendorDTO.setImage(vendor.getImage());
				return vendorDTO;
			}).toList());
			childCategoryResponseList.add(parentCategoryResponse);
		}));

		return childCategoryResponseList;

	}

	@Override
	public List<CategoryDTO> listAllCategoryIsShow() {
		List<Category> categories = categoryRepo.findAllByIsShow(true);

		return categories.stream().map(category -> {
			CategoryDTO categoryResponse = new CategoryDTO();
			categoryResponse.setId(category.getId());
			categoryResponse.setName(category.getName());
			categoryResponse.setImage(
					(category.getCategory() != null && category.getImage() != null && !category.getImage().isEmpty())
							? fileStorageService.getUrl(category.getImage())
							: null);
			return categoryResponse;
		}).toList();
	}

	@Override
	public CategoryDTO findById(UUID id) {
		Optional<Category> categoryOptional = categoryRepo.findById(id);
		if (categoryOptional.isEmpty()) {
			return null;
		}
		Category category = categoryOptional.get();
		CategoryDTO categoryResponse = mapCategoryToCategoryDTO(category);

		return categoryResponse;
	}

	
	@Override
	public String update(CategoryDTO categoryRequest) {
		Category category = categoryRepo.findById(categoryRequest.getId()).get();
		category.setName(categoryRequest.getName());
		category.setImage(categoryRequest.getImage());
		category.setPosition(categoryRequest.getPosition());
		category.setDesciption(categoryRequest.getDescription());
		category.setIsShow(categoryRequest.isShow());
		categoryRepo.save(category);
		categoryRequest.getChildCategories().stream().forEach((childCategoryRequest) -> {
			Category childCategory = null;
			if (childCategoryRequest.getId() != null) {
				childCategory = categoryRepo.findById(childCategoryRequest.getId()).get();

			} else {
				childCategory = new Category();
				childCategory.setCategory(category);
			}
			childCategory.setName(childCategoryRequest.getName());
			childCategory.setImage(childCategoryRequest.getImage());
			Category savedChildCategory = categoryRepo.save(childCategory);
			childCategoryRequest.getChildCategories().stream().forEach((childCategoryRequest1) -> {
				Category childCategory1 = null;
				if (childCategoryRequest1.getId() != null) {
					childCategory1 = categoryRepo.findById(childCategoryRequest1.getId()).get();
				} else {
					childCategory1 = new Category();
					childCategory1.setCategory(savedChildCategory);
				}
				childCategory1.setName(childCategoryRequest1.getName());
				childCategory1.setImage(childCategoryRequest1.getImage());
				childCategory1.setPosition(childCategoryRequest1.getPosition());
				childCategory1.setIsShow(childCategoryRequest1.isShow());
				categoryRepo.save(childCategory1);
			});
			categoryRequest.getVendors().stream().forEach(vendorRequest ->{
				Vendor vendor = null;
				if( vendorRequest.getId()!= null) {
					 vendor =vendorRepository.findById(vendorRequest.getId()).get();
				}
				else {
					vendor = new Vendor();
					vendor.setCategory(category);
				}
				vendor.setName(vendorRequest.getName());
				vendor.setImage(vendorRequest.getImage());
		
				vendorRepository.save(vendor);
			});
		});
		return "update succcessfully";
	}
	
	
	@Override
	public ProductsInCategory getProductsInCategory(UUID id) {
		Category category = categoryRepo.findById(id).get();
		ProductsInCategory productsInCategory = new ProductsInCategory();
		productsInCategory.setId(category.getId());
		productsInCategory.setTitle(category.getName());
		productsInCategory.setImg((category.getImage() != null && category.getCategory() == null)
				? fileStorageService.getUrl(category.getImage())
				: null);
		productsInCategory.setDescription(category.getDesciption());
		productsInCategory.setChildCates(listAllByParentId(category.getId()));
		productsInCategory.setVendors(category.getVendors().stream().map((vendor) -> {
			VendorDTO vendorResponse = new VendorDTO();
			vendorResponse.setId(vendor.getId());
			vendorResponse.setImage(fileStorageService.getUrl(vendor.getImage()));
			vendorResponse.setName(vendor.getName());
			return vendorResponse;
		}).toList());
		return productsInCategory;
	}


	private CategoryDTO mapCategoryToCategoryDTO(Category category) {
		CategoryDTO categoryResponse = new CategoryDTO();
		categoryResponse.setId(category.getId());
		categoryResponse.setName(category.getName());
		categoryResponse.setImage(category.getImage());
		categoryResponse.setDescription(category.getDesciption());
		categoryResponse.setPosition(category.getPosition()!=null ? category.getPosition() : null);
		categoryResponse.setShow(category.getIsShow() !=null ? category.getIsShow() : false);
		categoryRepo.findAllByParentId(category.getId()).forEach((childCategory -> {
			CategoryDTO childCategoryResponse = new CategoryDTO();
			childCategoryResponse.setId(childCategory.getId());
			childCategoryResponse.setImage(childCategory.getImage());
			childCategoryResponse.setName(childCategory.getName());
			childCategoryResponse.setPosition(childCategory.getPosition() != null ? childCategory.getPosition() : null);
			childCategoryResponse.setShow(childCategory.getIsShow()!=null ? childCategory.getIsShow() : false);
			categoryRepo.findAllByParentId(childCategory.getId()).forEach((childCategory1 -> {
				CategoryDTO childCategoryResponse1 = new CategoryDTO();
				childCategoryResponse1.setName(childCategory1.getName());
				childCategoryResponse1.setImage(childCategory1.getImage());
				childCategoryResponse1.setId(childCategory1.getId()); 
				childCategoryResponse1.setPosition(childCategory1.getPosition() != null ? childCategory1.getPosition() : null);
				childCategoryResponse1.setShow(childCategory1.getIsShow()!=null ? childCategory1.getIsShow() : false);
				childCategoryResponse.getChildCategories().add(childCategoryResponse1);
			}));
			categoryResponse.getChildCategories().add(childCategoryResponse);
		}));
		categoryResponse.setVendors(category.getVendors().stream().map((vendor) -> {
			VendorDTO vendorDTO = new VendorDTO();
			vendorDTO.setId(vendor.getId());
			vendorDTO.setName(vendor.getName());
			vendorDTO.setImage(vendor.getImage());
			return vendorDTO;
		}).toList());
		return categoryResponse;
	}

	@Override
	public String deleteById(UUID id) {
		Optional<Category> categoryOptional = categoryRepo.findById(id);
		if(categoryOptional.isEmpty()) {
			return "Can't delete category with Id = " + id; 
		}
		Category category = categoryOptional.get();
		vendorRepository.deleteByCategoryId(id);
		categoryRepo.deleteCategoryOfProductsById(id);
		categoryRepo.deleteAllByParentId(id);
		categoryRepo.delete(category);
		return "Delete category successfully";
	}


}
