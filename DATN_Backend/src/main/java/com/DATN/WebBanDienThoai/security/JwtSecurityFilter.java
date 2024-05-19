package com.DATN.WebBanDienThoai.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.DATN.WebBanDienThoai.repository.AccountRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtSecurityFilter extends OncePerRequestFilter{
	
	private final JwtUtils jwtUtils;
	private final AccountRepository accountRepo;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader("Authorization");
		if(header == null) {
			filterChain.doFilter(request, response);
			return;
		}
		if(!header.startsWith("Bearer")) {
			filterChain.doFilter(request, response);
			return;
		}
		String token = header.substring(7);
		String username = jwtUtils.extractUsernameFromToken(token);
		UserDetails userDetails = accountRepo.findByUsername(username).orElseThrow(()-> new RuntimeException("Không tìm thấy dữ liệu"));
		Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails.getUsername(),null,userDetails.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		filterChain.doFilter(request, response);
		return;
	}

}
