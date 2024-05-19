package com.DATN.WebBanDienThoai.service.Impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.DATN.WebBanDienThoai.entity.Banner;
import com.DATN.WebBanDienThoai.payload.HomeBanner;
import com.DATN.WebBanDienThoai.repository.BannerRepository;
import com.DATN.WebBanDienThoai.service.BannerService;
import com.DATN.WebBanDienThoai.service.FileStorageService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BannerServiceImpl implements BannerService{
	private final BannerRepository bannerRepo;
	private final FileStorageService fileStorageService;
	@Override
	public String save(Banner banner) {
		if(banner.isPrimaryBanner() ) {
			bannerRepo.resetPrimaryBanner();
		}
		bannerRepo.save(banner);
		
		return "save successfully";
	}

	@Override
	public List<Banner> findAll() {
		
		return bannerRepo.findAllByOrderByIdAsc();
	}

	@Override
	public Banner findById(UUID id) {
		Optional<Banner> bannerOptional = bannerRepo.findById(id);
		if(bannerOptional.isEmpty()) {
			return null;
		}
		
		return bannerOptional.get();
	}

	@Override
	public String updateById(UUID id,Banner banner) {
		Optional<Banner> bannerOptional = bannerRepo.findById(id);
		if(bannerOptional.isEmpty()) {
			return "Can't update banner with id = " + id;
		}
		Banner oldBanner = bannerOptional.get();
		oldBanner.setImage(banner.getImage());
		oldBanner.setShow(banner.isShow());
		if(banner.isPrimaryBanner() ) {
			bannerRepo.resetPrimaryBanner();
		}
		oldBanner.setPrimaryBanner(banner.isPrimaryBanner());
		oldBanner.setSlideBanner(banner.isSlideBanner());
		bannerRepo.save(oldBanner);
		return "Update successfully";
	}

	@Override
	public String deleteById(UUID id) {
		Optional<Banner> bannerOptional = bannerRepo.findById(id);
		if(bannerOptional.isEmpty()) {
			return "Can't delete banner with id = " + id;
		}
		Banner oldBanner = bannerOptional.get();
		bannerRepo.delete(oldBanner);
		return "delete successfully";
	}

	@Override
	public HomeBanner getHomeBanner() {
		List<Banner> bannerList = bannerRepo.findAllShowedBanner();
		HomeBanner homeBanner =new HomeBanner();
		bannerList.stream().forEach((banner)->{
			if(banner.isPrimaryBanner()) {
				homeBanner.setPrimaryBanner(fileStorageService.getUrl(banner.getImage()));
			}
			if(banner.isSlideBanner()) {
				homeBanner.getSlideBanner().add(fileStorageService.getUrl(banner.getImage()));
			}
		});
		return homeBanner;
	}

}
