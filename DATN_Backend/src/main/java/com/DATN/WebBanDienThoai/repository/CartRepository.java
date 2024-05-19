package com.DATN.WebBanDienThoai.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.Cart;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Repository
public interface CartRepository extends JpaRepository<Cart, UUID>{
	
	@Query(value = "SELECT * FROM cart WHERE account_id = :accountId",nativeQuery = true)
	List<Cart> findAllByAccountId(@Param("accountId") UUID accountId);
	
	@Query(value = "SELECT * FROM cart WHERE option_detail_id = :optionDetailId AND account_id = :accountId ",nativeQuery=true)
	Optional<Cart> findByOptionDetailIdAndAccountId(@Param("optionDetailId") UUID optionDetailId,@Param("accountId") UUID accountId);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM cart WHERE account_id = :accountId",nativeQuery=true)
	void deleteAllByAccountId(@Param("accountId") UUID accountId);
}
