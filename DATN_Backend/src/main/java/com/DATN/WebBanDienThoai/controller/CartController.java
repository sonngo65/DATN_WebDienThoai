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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DATN.WebBanDienThoai.payload.CartRequest;
import com.DATN.WebBanDienThoai.payload.CartResponse;
import com.DATN.WebBanDienThoai.service.CartService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/carts")
@AllArgsConstructor
@CrossOrigin
public class CartController {
	private final CartService cartService;
	@PostMapping
	ResponseEntity<CartResponse> addCart(@RequestBody CartRequest cartRequest){
		CartResponse response = cartService.save(cartRequest);
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
	@GetMapping("/{accountId}")
	ResponseEntity<List<CartResponse>> listCartByAccount(@PathVariable("accountId")  UUID accountId){
		List<CartResponse> cartResponses = cartService.getByAccountId(accountId);
		return new ResponseEntity<>(cartResponses,HttpStatus.OK);
		
	}
	@DeleteMapping("/{id}")
	ResponseEntity<String> DeleteCart(@PathVariable UUID id){
		String response = cartService.deleteById(id);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	@PutMapping("/{id}")
	ResponseEntity<String> UpdateCart(@PathVariable UUID id,@RequestParam("quantity") int quantity){
		String response = cartService.updateById(id,quantity);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
}
