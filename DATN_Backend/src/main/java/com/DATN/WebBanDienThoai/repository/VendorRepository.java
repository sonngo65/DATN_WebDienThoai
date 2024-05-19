package com.DATN.WebBanDienThoai.repository;

import com.DATN.WebBanDienThoai.entity.Vendor;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VendorRepository  extends JpaRepository<Vendor, UUID> {
    @Query(value= "SELECT * FROM vendor WHERE category_id = :categoryId",nativeQuery = true)
    List<Vendor> findAllByCategoryId(@Param("categoryId") UUID categoryId);
    @Transactional
    @Modifying
    @Query(value ="DELETE FROM vendor WHERE vendor.category_id = :categoryId ",nativeQuery = true)
    void deleteByCategoryId(@Param("categoryId") UUID categoryId);
    
}
