package com.DATN.WebBanDienThoai.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.ReceiveInfo;

@Repository
public interface ReceiveInfoRepository extends JpaRepository<ReceiveInfo, UUID>{

}
