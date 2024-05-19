package com.DATN.WebBanDienThoai.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.Banner;

import jakarta.transaction.Transactional;

@Repository
public interface BannerRepository  extends JpaRepository<Banner,UUID>{
	
	List<Banner> findAllByOrderByIdAsc();
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE banner Set is_primary_banner = false",nativeQuery = true)
	void resetPrimaryBanner();
	
	@Query(value ="SELECT * FROM banner WHERE is_show = true",nativeQuery =  true)
	List<Banner> findAllShowedBanner();
}
