package com.DATN.WebBanDienThoai.controller;

import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.DATN.WebBanDienThoai.payload.CkeditorResponse;
import com.DATN.WebBanDienThoai.service.FileStorageService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/files")
@CrossOrigin
public class FileStorageController {
	private final FileStorageService  fileStorageService;
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file){
		boolean isUploaded = fileStorageService.upload(file);
		if(isUploaded) {
			return new ResponseEntity<>("upload successfully",HttpStatus.CREATED);
		}
		return new ResponseEntity<>("upload failure",HttpStatus.BAD_REQUEST);
	}
	@GetMapping("/{fileName}")
	ResponseEntity<InputStreamResource> getFileResource(@PathVariable("fileName") String fileName) throws IOException{
		var file = new ClassPathResource("uploads/" + fileName);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(new InputStreamResource(file.getInputStream()));
	}
	
	@PostMapping(path = "/connect",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	ResponseEntity<?> uploadFileConnectCKE(@RequestBody MultipartFile upload){
		CkeditorResponse response = new CkeditorResponse();
		boolean isUploaded = fileStorageService.upload(upload);
		if(isUploaded) {
			response.setUrl(fileStorageService.getUrl(upload.getOriginalFilename()));
			return new ResponseEntity<>(response,HttpStatus.CREATED);
		}
		return new ResponseEntity<>("upload failure",HttpStatus.BAD_REQUEST);
	}

}
