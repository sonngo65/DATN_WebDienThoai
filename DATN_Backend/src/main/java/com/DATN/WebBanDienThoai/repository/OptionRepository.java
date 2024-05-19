package com.DATN.WebBanDienThoai.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.Option;

import jakarta.transaction.Transactional;


@Repository
public interface OptionRepository extends JpaRepository<Option, UUID>{
	
	
	@Query(value = "select * from option where parent_id = :id ",nativeQuery = true)
	List<Option> findAllByParentId(@Param("id") UUID id);
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM option WHERE product_id = :productId",nativeQuery = true)
	void DeleteByProductId(@Param("productId") UUID productId);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM option WHERE parent_id = :parentId",nativeQuery = true)
	void DeleteByParentId(@Param("parentId") UUID parentId);
}
