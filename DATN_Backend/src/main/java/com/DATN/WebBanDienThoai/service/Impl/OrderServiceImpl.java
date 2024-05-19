package com.DATN.WebBanDienThoai.service.Impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.DATN.WebBanDienThoai.entity.Account;
import com.DATN.WebBanDienThoai.entity.OrderDetail;
import com.DATN.WebBanDienThoai.entity.Orders;
import com.DATN.WebBanDienThoai.entity.ReceiveInfo;
import com.DATN.WebBanDienThoai.payload.AccountResponse;
import com.DATN.WebBanDienThoai.payload.CartResponse;
import com.DATN.WebBanDienThoai.payload.OrderRequest;
import com.DATN.WebBanDienThoai.payload.OrderResponse;
import com.DATN.WebBanDienThoai.payload.PageResponse;
import com.DATN.WebBanDienThoai.repository.AccountRepository;
import com.DATN.WebBanDienThoai.repository.CartRepository;
import com.DATN.WebBanDienThoai.repository.OptionDetailRepository;
import com.DATN.WebBanDienThoai.repository.OrderDetailRepository;
import com.DATN.WebBanDienThoai.repository.OrderRepository;
import com.DATN.WebBanDienThoai.repository.ReceiveInfoRepository;
import com.DATN.WebBanDienThoai.service.CartService;
import com.DATN.WebBanDienThoai.service.FileStorageService;
import com.DATN.WebBanDienThoai.service.OrderService;

import jakarta.persistence.criteria.Order;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepo;
	private final OrderDetailRepository orderDetailRepo;
	private final AccountRepository accountRepo;
	private final ReceiveInfoRepository receiveInfoRepo;
	private final OptionDetailRepository optionDetailRepo;
	private final CartRepository cartRepo;
	private final FileStorageService fileStorageService;

//	trả về receiveInfo để cập nhập lại địa chỉ giao hàng nếu người dùng nhập để chỉ mới;
	@Override
	public ReceiveInfo save(OrderRequest orderRequest) {
		Orders order = new Orders();
		Account account = accountRepo.findById(orderRequest.getAccountId()).get();
		ReceiveInfo receiveInfo = orderRequest.getReceiveInfo();
		ReceiveInfo savedReceiveInfo = null;
		if (account.getReceiveInfo() == null) {
			savedReceiveInfo = receiveInfoRepo.save(receiveInfo);
			account.setReceiveInfo(savedReceiveInfo);

			accountRepo.save(account);
		} else {
			ReceiveInfo oldReceiveInfo = account.getReceiveInfo();
			oldReceiveInfo.setName(receiveInfo.getName());
			oldReceiveInfo.setAddress(receiveInfo.getAddress());
			oldReceiveInfo.setPhoneNumber(receiveInfo.getPhoneNumber());
			oldReceiveInfo.setNote(receiveInfo.getNote());
			savedReceiveInfo = receiveInfoRepo.save(oldReceiveInfo);
		}

		order.setAccount(account);

		order.setStatus(0);

		order.setOrderDate(new Date());

		Orders savedOrder = orderRepo.save(order);

		orderRequest.getOptionDetailList().stream().forEach((optionDetail) -> {
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setOrder(savedOrder);
			orderDetail.setOptionDetail(optionDetailRepo.findById(optionDetail.getOptionDetailId()).get());
			orderDetail.setQuantity(optionDetail.getQuantity());
			orderDetail.setPrice(optionDetail.getPrice());
			orderDetailRepo.save(orderDetail);
		});
		cartRepo.deleteAllByAccountId(orderRequest.getAccountId());

		return savedReceiveInfo;
	}

	@Override
	public List<OrderResponse> findAllByAccountId(UUID accountId) {
		List<Orders> orderList = orderRepo.findAllByAccountId(accountId);

		return orderList.stream().map(orderItem -> {
			OrderResponse orderResponse = new OrderResponse();
			orderResponse.setId(orderItem.getId());
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
		}).toList();
	}

	@Override
	public OrderResponse updateStatus(UUID orderId, int status) {
		Orders order = orderRepo.findById(orderId).get();
		order.setStatus(status);
		Orders updatedOrder = orderRepo.save(order);
		OrderResponse orderResponse = new OrderResponse();
		
		orderResponse.setId(updatedOrder.getId());
		orderResponse.setOrderedTime(updatedOrder.getOrderDate());
		orderResponse.setProducts(updatedOrder.getOrderDetails().stream().map(orderDetail -> {
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
		orderResponse.setStatus(updatedOrder.getStatus());
		return orderResponse;
	}

	@Override
	public PageResponse findAllByOrderByOrderDate( Integer pageNo, Integer pageSize, String sortBy) {
		PageResponse pageResponse = new PageResponse();
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		Page<Orders> pageResult = orderRepo.findAllByOrderByOrderDateDesc(paging);	
	 	pageResponse.setPageData(pageResult.getContent().stream().map(orderItem -> {
			OrderResponse orderResponse = new OrderResponse();
			orderResponse.setId(orderItem.getId());
			orderResponse.setAccount(new AccountResponse(orderItem.getAccount().getId(),orderItem.getAccount().getUsername(),orderItem.getAccount().getReceiveInfo()));
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
	 	return pageResponse;
	}

	@Override
	public PageResponse findAllByDurationTime(Date timeStart, Date timeEnd, Integer pageNo, Integer pageSize,
			String sortBy) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		PageResponse pageResponse = new PageResponse();
		Page<Orders> pageResult = orderRepo.getOdersByDurationTime(timeStart, timeEnd, paging);
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
		return pageResponse;
	}

}
