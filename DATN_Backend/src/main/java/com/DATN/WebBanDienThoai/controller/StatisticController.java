package com.DATN.WebBanDienThoai.controller;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DATN.WebBanDienThoai.entity.Orders;
import com.DATN.WebBanDienThoai.payload.AccountResponse;
import com.DATN.WebBanDienThoai.payload.CartResponse;
import com.DATN.WebBanDienThoai.payload.OrderResponse;
import com.DATN.WebBanDienThoai.payload.PageResponse;
import com.DATN.WebBanDienThoai.payload.ProductSaleStatistic;
import com.DATN.WebBanDienThoai.payload.Statistic;
import com.DATN.WebBanDienThoai.repository.AccountRepository;
import com.DATN.WebBanDienThoai.repository.CategoryRepository;
import com.DATN.WebBanDienThoai.repository.NewsRepository;
import com.DATN.WebBanDienThoai.repository.OrderRepository;
import com.DATN.WebBanDienThoai.repository.ProductRepository;
import com.DATN.WebBanDienThoai.service.FileStorageService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/statistic")
@AllArgsConstructor
@CrossOrigin
public class StatisticController {
	private final ProductRepository productRepo;
	private final AccountRepository accountRepo;
	private final OrderRepository orderRepo;
	private final CategoryRepository categoryRepo;
	private final NewsRepository newsRepository;
	private final FileStorageService fileStorageService;

	@GetMapping
	ResponseEntity<Statistic> getStatistic() {
		Statistic statistic = new Statistic();
		statistic.setTotalAccounts(accountRepo.getTotalAccounts());
		statistic.setTotalCategories(categoryRepo.getTotalCategories());
		statistic.setTotalErning(orderRepo.getTotalErning());
		statistic.setTotalOrders(orderRepo.getTotalOrders());
		statistic.setTotalNews(newsRepository.getTotalNews());
		statistic.setTotalProducts(productRepo.getTotalProducts());
		return new ResponseEntity<>(statistic, HttpStatus.OK);

	}

	@GetMapping("/sale-product")
	ResponseEntity<ProductSaleStatistic> getProductSaleStatistic(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date timeStart,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date timeEnd) {
		ProductSaleStatistic productSaleStatistic = new ProductSaleStatistic();
		productSaleStatistic.setTotalErning(orderRepo.getTotalErning(timeStart, timeEnd));
		productSaleStatistic.setTotalOrders(orderRepo.getTotalOrders(timeStart, timeEnd));
		productSaleStatistic.setTotalSaleProducts(orderRepo.getTotalSaleProducts(timeStart, timeEnd));

		return new ResponseEntity<>(productSaleStatistic, HttpStatus.OK);
	}

	@GetMapping("/sale-product/orders")
	ResponseEntity<PageResponse> getProductSaleStatisticOrders(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date timeStart,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date timeEnd,
			@RequestParam(defaultValue = "0") Integer pageNo, @RequestParam(defaultValue = "8") Integer pageSize,
			@RequestParam(defaultValue = "order_date") String sortBy) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		PageResponse pageResponse = new PageResponse();
		Page<Orders> pageResult = orderRepo.getOdersStatistic(timeStart, timeEnd, paging);
		pageResponse.setPageData(pageResult.getContent().stream().map(orderItem -> {
			OrderResponse orderResponse = new OrderResponse();
			orderResponse.setId(orderItem.getId());
			orderResponse.setAccount(new AccountResponse(orderItem.getAccount().getId(),
					orderItem.getAccount().getUsername(), orderItem.getAccount().getReceiveInfo()));
			orderResponse.setOrderedTime(orderItem.getOrderDate());
			orderResponse.setStatus(orderItem.getStatus());
			orderResponse.setProducts(orderItem.getOrderDetails().stream().map(orderDetail -> {
				CartResponse product = new CartResponse();
				product.setId(orderDetail.getOptionDetail().getProduct().getId());
				product.setImage(fileStorageService.getUrl(orderDetail.getOptionDetail().getImage()));
				product.setName(orderDetail.getOptionDetail().getProduct().getName());
				product.setPrice(orderDetail.getPrice());
				product.setQuantity(orderDetail.getQuantity());
				product.setOptionName(orderDetail.getOptionDetail().getOption1().getName()
						+ (orderDetail.getOptionDetail().getOption2() != null
								? ("/" + orderDetail.getOptionDetail().getOption2().getName())
								: ""));
				return product;

			}).toList());
			return orderResponse;
		}).toList());
		pageResponse.setTotalPages(pageResult.getTotalPages());
		return new ResponseEntity<>(pageResponse, HttpStatus.OK);
	}
}
