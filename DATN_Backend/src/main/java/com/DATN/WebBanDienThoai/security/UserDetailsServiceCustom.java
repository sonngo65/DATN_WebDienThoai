package com.DATN.WebBanDienThoai.security;

import org.hibernate.ResourceClosedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.DATN.WebBanDienThoai.repository.AccountRepository;



@Component
public class UserDetailsServiceCustom implements UserDetailsService{
		
	@Autowired
	private AccountRepository accountRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		return accountRepo.findByUsername(username).orElseThrow(()->new RuntimeException("Không tìm thấy dữ liệu"));
	}
	
}
