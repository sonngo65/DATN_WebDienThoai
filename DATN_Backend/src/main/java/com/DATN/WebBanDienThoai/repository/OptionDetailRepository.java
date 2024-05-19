package com.DATN.WebBanDienThoai.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.Option;
import com.DATN.WebBanDienThoai.entity.OptionDetail;

import jakarta.transaction.Transactional;

@Repository
public interface OptionDetailRepository extends JpaRepository<OptionDetail, UUID>{
	@Query(value = "SELECT od.id,od.option_id1,od.option_id2,od.product_id,od.price,od.origin_price,od.quantity,od.image,od.status FROM option_detail  od "
			+ "INNER JOIN option o1 On od.option_id1 = o1.id "
			+ "INNER JOIN option o2 ON od.option_id2 = o2.id  "
			+ "WHERE o1.name = :nameOption1 AND o2.name = :nameOption2",nativeQuery = true)
	OptionDetail findByNameOption1AndNameOption2(@Param("nameOption1") String nameOption1,@Param("nameOption2") String nameOption2);
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM option_detail WHERE  product_id = :productId",nativeQuery=true)
	void deleteByProductId(@Param("productId") UUID productId);
}
