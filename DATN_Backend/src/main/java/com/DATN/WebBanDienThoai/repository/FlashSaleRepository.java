package com.DATN.WebBanDienThoai.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.FlashSale;



@Repository
public interface FlashSaleRepository extends JpaRepository<FlashSale, UUID>{

}
