package com.DATN.WebBanDienThoai.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DATN.WebBanDienThoai.entity.Banner;
import com.DATN.WebBanDienThoai.payload.HomeBanner;
import com.DATN.WebBanDienThoai.service.BannerService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/banners")
@CrossOrigin
@AllArgsConstructor
public class BannerController {
	private final BannerService bannerService;
	@GetMapping
	ResponseEntity<List<Banner>> getAllBanner(){
		List<Banner>  bannerList =bannerService.findAll();
		return new ResponseEntity<>(bannerList,HttpStatus.OK);
	}
	@GetMapping("/home")
	ResponseEntity<HomeBanner> getAllHomeBanner(){
		HomeBanner  banner =bannerService.getHomeBanner();
		return new ResponseEntity<>(banner,HttpStatus.OK);
	}
	@PostMapping
	ResponseEntity<String> postBanner(@RequestBody Banner banner){
		String response = bannerService.save(banner);
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
	@GetMapping("/{id}")
	ResponseEntity<Banner> getBannerById(@PathVariable UUID id){
		Banner banner = bannerService.findById(id);
		return new ResponseEntity<>(banner,HttpStatus.OK);
	}
	@PutMapping("/{id}")
	ResponseEntity<String> updateBannerById(@PathVariable UUID id, @RequestBody Banner banner){
		String response = bannerService.updateById(id,banner);
		return new ResponseEntity<>(response,HttpStatus.OK); 
	}
	@DeleteMapping("/{id}")
	ResponseEntity<String> deleteBannerById(@PathVariable UUID id){
		String response = bannerService.deleteById(id);
		return new ResponseEntity<>(response,HttpStatus.OK); 
	}
}
