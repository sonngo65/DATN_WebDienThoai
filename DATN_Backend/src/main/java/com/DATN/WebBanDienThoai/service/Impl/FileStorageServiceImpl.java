package com.DATN.WebBanDienThoai.service.Impl;

import java.io.InputStream;
import java.nio.file.CopyOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.DATN.WebBanDienThoai.service.FileStorageService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {

	private final Path uploadPath;
	@Override
	public boolean upload(MultipartFile file) {
		String fileName = file.getOriginalFilename();
		try (InputStream inputStream = file.getInputStream()) {
			Files.copy(inputStream, uploadPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
		} catch (Exception e) {
			return false;

		}
		return true;
	}
	@Override
	public String getUrl(String fileName) {
		return "http://localhost:8081/api/v1/files/"+fileName ;
	}
	
	
	@Override
	public String getImageFromUrl (String fileUrl) {
		
		if(fileUrl == null) {
			return null;
		}
		if(fileUrl.contains("http://localhost:8081/api/v1/files/")) {
			return fileUrl.substring(35);
		}
		return fileUrl;
			
	}
	

}
