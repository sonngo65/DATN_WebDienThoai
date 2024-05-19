package com.DATN.WebBanDienThoai.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.Category;

import jakarta.transaction.Transactional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID>{
    @Query(value = "SELECT * FROM category "
    	
    	
    		+ "WHERE category.parent_id IS NULL ORDER BY position",nativeQuery = true)
    List<Category> findAllParents();
    @Query(value = "SELECT * FROM  category WHERE parent_id = :parentId",nativeQuery = true)
    List<Category> findAllByParentId(@Param("parentId") UUID parentId);
    
    @Query(value = "SELECT * FROM category WHERE is_show = :isShow ORDER BY name",nativeQuery=true)
    List<Category> findAllByIsShow(@Param("isShow") Boolean isShow);
     
    @Transactional
    @Modifying
    @Query(value ="DELETE FROM product_in_category WHERE product_in_category.product_id = :productId ",nativeQuery = true)
    void deleteProductInCategoryById(@Param("productId") UUID productId);
   
    @Transactional
    @Modifying
    @Query(value ="DELETE FROM product_in_category WHERE product_in_category.category_id = :categoryId ",nativeQuery = true)
    void deleteCategoryOfProductsById(@Param("categoryId") UUID categoryId);
    
    
    @Transactional
    @Modifying
    @Query(value ="UPDATE category SET parent_id = null WHERE parent_id = :parentId ",nativeQuery = true)
    void deleteAllByParentId(@Param("parentId") UUID parentId);
    
    @Query(value = "SELECT count(*) FROM category",nativeQuery = true)
    Long getTotalCategories();
}
