package com.DATN.WebBanDienThoai.service.Impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.DATN.WebBanDienThoai.entity.Account;
import com.DATN.WebBanDienThoai.entity.Cart;
import com.DATN.WebBanDienThoai.entity.Option;
import com.DATN.WebBanDienThoai.entity.OptionDetail;
import com.DATN.WebBanDienThoai.payload.CartRequest;
import com.DATN.WebBanDienThoai.payload.CartResponse;
import com.DATN.WebBanDienThoai.repository.AccountRepository;
import com.DATN.WebBanDienThoai.repository.CartRepository;
import com.DATN.WebBanDienThoai.repository.OptionDetailRepository;
import com.DATN.WebBanDienThoai.service.CartService;
import com.DATN.WebBanDienThoai.service.FileStorageService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartServicecImpl implements CartService {

	private final CartRepository cartRepo;
	private final AccountRepository accountRepo;
	private final OptionDetailRepository optionDetailRepo;
	private final FileStorageService fileService;

	@Override
	public CartResponse save(CartRequest cartRequest) {
		Cart cart = new Cart();
		Account account = accountRepo.findById(cartRequest.getAccountId()).get();
		OptionDetail optionDetail = optionDetailRepo.findById(cartRequest.getOptionDetailId()).get();
		Optional<Cart> oldCartOptional = cartRepo.findByOptionDetailIdAndAccountId(cartRequest.getOptionDetailId(),
				cartRequest.getAccountId());
		Cart savedCart = null;
		if (!oldCartOptional.isEmpty()) {
			Cart oldCart = oldCartOptional.get();
			oldCart.setQuantity(oldCart.getQuantity() + cartRequest.getQuantity());
			savedCart = cartRepo.save(oldCart);

		} else {
			cart.setAccount(account);
			cart.setOptionDetail(optionDetail);
			cart.setQuantity(cartRequest.getQuantity());

			savedCart = cartRepo.save(cart);
		}
		return convertCartToCartResponse(savedCart);
	}

	@Override
	public List<CartResponse> getByAccountId(UUID accountId) {
		List<Cart> carts = cartRepo.findAllByAccountId(accountId);
		return carts.stream().map((cart) -> {
			CartResponse cartResponse = convertCartToCartResponse(cart);
			return cartResponse;

		}).toList();
	}

	public CartResponse convertCartToCartResponse(Cart cart) {
		CartResponse cartResponse = new CartResponse();
		cartResponse.setId(cart.getId());
		cartResponse.setOptionDetailId(cart.getOptionDetail().getId());
		cartResponse.setName(cart.getOptionDetail().getProduct().getName());
		cartResponse.setOptionName(cart.getOptionDetail().getOption1().getName()
				+ (cart.getOptionDetail().getOption2() != null ? ("/" + cart.getOptionDetail().getOption2().getName())
						: ""));

		cartResponse.setImage(fileService.getUrl(cart.getOptionDetail().getImage()));
		cartResponse.setPrice(cart.getOptionDetail().getPrice());
		cartResponse.setQuantity(cart.getQuantity());
		if(cart.getQuantity() <= cart.getOptionDetail().getQuantity()) {
			cartResponse.setStatus(1);
		}
		else {
			cartResponse.setStatus(2);
		}
		return cartResponse;
	}

	@Override 
	public String deleteById(UUID id) {
		try {
			cartRepo.deleteById(id);

		}catch(IllegalArgumentException e) {
			return "id not null";
		}
		return "Delete successfully";
	}

	@Override
	public String updateById(UUID id,int quantity) {
		Optional<Cart> oldCartOptional = cartRepo.findById(id);
		if(oldCartOptional.isEmpty()) {
			return "can't find cart with id = "+id;
		}
		Cart oldCart = oldCartOptional.get();
		oldCart.setQuantity(quantity);
		cartRepo.save(oldCart);
		return "update quantity successfully";
	}

}
