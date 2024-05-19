package com.DATN.WebBanDienThoai.controller;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DATN.WebBanDienThoai.entity.Orders;
import com.DATN.WebBanDienThoai.entity.ReceiveInfo;
import com.DATN.WebBanDienThoai.payload.AccountResponse;
import com.DATN.WebBanDienThoai.payload.CartResponse;
import com.DATN.WebBanDienThoai.payload.OrderRequest;
import com.DATN.WebBanDienThoai.payload.OrderResponse;
import com.DATN.WebBanDienThoai.payload.PageResponse;
import com.DATN.WebBanDienThoai.service.OrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/orders")
@AllArgsConstructor
@CrossOrigin
public class OrderController {
	
	private final OrderService orderService;
	
	@PostMapping
	ResponseEntity<ReceiveInfo> addOrder(@RequestBody OrderRequest orderRequest){
		ReceiveInfo result = orderService.save(orderRequest);
		return new ResponseEntity<>(result,HttpStatus.CREATED);
	}
	@GetMapping()
	ResponseEntity<PageResponse> getAllOrder(@RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "10") Integer pageSize, @RequestParam(defaultValue = "id") String sortBy){
		PageResponse orderResponseList = orderService.findAllByOrderByOrderDate(pageNo,pageSize,sortBy);
		return new ResponseEntity<>(orderResponseList,HttpStatus.OK);
	}
	
	@GetMapping("/{accountId}")
	ResponseEntity<List<OrderResponse>> getOrder(@PathVariable("accountId") UUID accountId){
		List<OrderResponse> orderResponseList = orderService.findAllByAccountId(accountId);
		return new ResponseEntity<>(orderResponseList,HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/status/{status}")
	ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable("orderId") UUID orderId, @PathVariable("status") int status){
		OrderResponse orderResponse = orderService.updateStatus(orderId, status);
		return new ResponseEntity<>(orderResponse, HttpStatus.OK);
	}
	
	@GetMapping("/search")
	ResponseEntity<PageResponse> getProductSaleStatisticOrders(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date timeStart,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date timeEnd,
			@RequestParam(defaultValue = "0") Integer pageNo, @RequestParam(defaultValue = "8") Integer pageSize,
			@RequestParam(defaultValue = "order_date") String sortBy) {
		PageResponse pageResponse = orderService.findAllByDurationTime(timeStart,timeEnd,pageNo,pageSize,sortBy);
		return new ResponseEntity<>(pageResponse, HttpStatus.OK);
	}
}
