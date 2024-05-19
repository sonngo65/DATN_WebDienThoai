package com.DATN.WebBanDienThoai.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.Product;
import com.DATN.WebBanDienThoai.entity.StatisticErning;
import com.DATN.WebBanDienThoai.payload.StatisticSale;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>,PagingAndSortingRepository<Product, UUID>{
	Page<Product> findAllByOrderByIdAsc(Pageable paging);
	
	
	@Query(value = "SELECT * FROM product WHERE convertTVkdau(name) ILIKE CONCAT('%',convertTVkdau(:name),'%')",nativeQuery = true)
	Page<Product> findAllByName(@Param("name") String name,Pageable paging);
	@Query(value = "SELECT * FROM product WHERE convertTVkdau(name) ILIKE CONCAT('%',convertTVkdau(:name),'%') ",nativeQuery = true)
	List<Product> findAllByName(@Param("name") String name);

	@Query(nativeQuery = true)
	List<StatisticSale> getStatisticSales(@Param("groupTime") String groupTime,@Param("durationTime") String durationTime,@Param("preTime") String preTime);
	
	@Query(nativeQuery = true)
	List<StatisticErning> getStatisticErning(@Param("groupTime") String groupTime,@Param("durationTime") String durationTime,@Param("preTime") String preTime);
	
	
	@Query(nativeQuery = true)
	StatisticSale getStatisticSalesAll();
	@Query(nativeQuery = true)
	StatisticErning getStatisticErningAll();
	
	@Query(value = "SELECT * FROM product INNER JOIN product_in_category on product.id = product_in_category.product_id WHERE product_in_category.category_id = :categoryId AND product_in_category.product_id != :productId LIMIT 9",nativeQuery = true)
	List<Product> getRelatedProductsByCategoryId(@Param("categoryId") UUID categoryId,@Param("productId") UUID productId);
	@Query(value = "SELECT * FROM product p INNER JOIN product_in_category p_c on p.id = p_c.product_id WHERE p_c.category_id = :categoryId AND product_filter(:priceStart,:priceEnd,:vendorId,p)",nativeQuery = true)
	Page<Product> getProductsByCategoryId(@Param("categoryId") UUID categoryId,@Param("vendorId") UUID vendorId,@Param("priceStart") Double priceStart,@Param("priceEnd") Double priceEnd,Pageable paging);
//	@Query(value = "SELECT * FROM product p INNER JOIN product_in_category p_c on p.id = p_c.product_id WHERE p_c.category_id = :categoryId AND p.vendor_id = :vendorId",nativeQuery = true)
//	Page<Product> getProductsByCategoryIdAndVendorId(@Param("categoryId") UUID categoryId,@Param("vendorId") UUID vendorId,Pageable paging);
	
	@Query(value = "SELECT count(*) from product",nativeQuery=true)
	Long getTotalProducts();
}
