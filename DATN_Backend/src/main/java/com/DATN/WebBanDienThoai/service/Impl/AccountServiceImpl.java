package com.DATN.WebBanDienThoai.service.Impl;

import java.util.Date;
import java.util.HashSet;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.DATN.WebBanDienThoai.entity.Account;
import com.DATN.WebBanDienThoai.entity.Cart;
import com.DATN.WebBanDienThoai.entity.Role;
import com.DATN.WebBanDienThoai.payload.AccountRequest;
import com.DATN.WebBanDienThoai.payload.AccountResponse;
import com.DATN.WebBanDienThoai.payload.CartResponse;
import com.DATN.WebBanDienThoai.payload.LoginResponse;
import com.DATN.WebBanDienThoai.payload.PageResponse;
import com.DATN.WebBanDienThoai.repository.AccountRepository;
import com.DATN.WebBanDienThoai.repository.CartRepository;
import com.DATN.WebBanDienThoai.repository.RoleRepository;
import com.DATN.WebBanDienThoai.security.JwtUtils;
import com.DATN.WebBanDienThoai.service.AccountService;
import com.DATN.WebBanDienThoai.service.CartService;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService{

	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;

	private final AccountRepository accountRepo;
	private final RoleRepository roleRepo;
	private final CartService cartService;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public String save(AccountRequest accountRequest) {
		Account account = new Account();
		account.setRoles(new HashSet<Role>());
		account.getRoles().add(roleRepo.findByName("ROLE_USER"));
		account.setUsername(accountRequest.getUsername());
		account.setPassword( passwordEncoder.encode(accountRequest.getPassword()));
		accountRepo.save(account);
		return "Sign up successfully";
	}

	@Override
	public LoginResponse login(AccountRequest accountRequest) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(accountRequest.getUsername(),accountRequest.getPassword()));
		if(authentication.isAuthenticated()) {
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		Account account =			(Account) authentication.getPrincipal();
		AccountResponse accountResponse = new AccountResponse(account.getId(),account.getUsername(),account.getReceiveInfo(),(List<?>) authentication.getAuthorities(),jwtUtils.generateToken(authentication.getName()));
		List<CartResponse> cartResponses =  cartService.getByAccountId(account.getId());
		
		return new LoginResponse(accountResponse,cartResponses);
	}

	@Override
	public PageResponse findAll(Integer pageNo, Integer pageSize, String sortBy) {
		PageResponse pageResponse = new PageResponse();
		Pageable paging = PageRequest.of(pageNo, pageSize,Sort.by( sortBy));
		Page<Account> pageResult = accountRepo.findAll(paging);
		pageResponse.setPageData(pageResult.getContent().stream().map((account)->{
			AccountResponse accountResponse = new AccountResponse();
			accountResponse.setId(account.getId());
			accountResponse.setUsername(account.getUsername());
			return accountResponse;
		}).toList());;
		pageResponse.setTotalPages(pageResult.getTotalPages());
		return pageResponse;
	}

}
