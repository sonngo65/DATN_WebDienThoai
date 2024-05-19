package com.DATN.WebBanDienThoai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DATN.WebBanDienThoai.payload.AccountRequest;
import com.DATN.WebBanDienThoai.payload.AccountResponse;
import com.DATN.WebBanDienThoai.payload.LoginResponse;
import com.DATN.WebBanDienThoai.payload.PageResponse;
import com.DATN.WebBanDienThoai.service.AccountService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/accounts")
@AllArgsConstructor
@CrossOrigin
public class AccountController {
	private final AccountService accountService;
	@GetMapping()
	ResponseEntity<PageResponse> getAll(@RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "10") Integer pageSize, @RequestParam(defaultValue = "id") String sortBy){
		PageResponse accountResponseList = accountService.findAll(pageNo,pageSize,sortBy);
		return new ResponseEntity<>(accountResponseList,HttpStatus.CREATED);

	}
	@PostMapping("/sign-up")
	ResponseEntity<String> signUp(@RequestBody AccountRequest accountRequest){
		String result = accountService.save(accountRequest);
		return new ResponseEntity<>(result,HttpStatus.CREATED);
	}
	
	@PostMapping("/sign-in")
	ResponseEntity<LoginResponse> signIn(@RequestBody AccountRequest accountRequest){
		LoginResponse loginResponse = accountService.login(accountRequest);
		return new ResponseEntity<>(loginResponse,HttpStatus.OK);
		
	}
}
