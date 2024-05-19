package com.DATN.WebBanDienThoai.service;

import java.util.List;
import java.util.UUID;

import com.DATN.WebBanDienThoai.entity.Banner;
import com.DATN.WebBanDienThoai.payload.HomeBanner;

public interface BannerService {
	String save(Banner banner);
	List<Banner> findAll();
	Banner findById(UUID id);
	String updateById(UUID id,Banner banner);
	String deleteById(UUID id);
	HomeBanner getHomeBanner();
}
