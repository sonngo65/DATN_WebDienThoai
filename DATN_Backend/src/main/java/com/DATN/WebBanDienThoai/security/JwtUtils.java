package com.DATN.WebBanDienThoai.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
	@Value("${application.security.jwt.secret}")
	private String secret;
	private long expiration = 24*60*60*100;
	
	
	public long getExpiration() {
		return expiration;
	}
	
	public String generateToken(String username) {
		return  Jwts.builder().setAudience(username)
				.setExpiration( new Date(System.currentTimeMillis() + expiration))
				.setIssuedAt(new Date())
				.signWith(signSecretKey())
				.compact();
	}
	public Claims extractClaimsFromToken(String token) {
		return Jwts.parserBuilder().setSigningKey(signSecretKey()).build().parseClaimsJws(token).getBody();
	}
	public String extractUsernameFromToken(String token) {
		return extractClaimsFromToken(token).getAudience();
	}
	public Date extractExpirationFromToken(String token) {
		return extractClaimsFromToken(token).getExpiration();
	}
	public Boolean isExpired(String token) {
		return new Date().before(extractExpirationFromToken(token));
	}
	private  Key signSecretKey() {
		byte[] key =Decoders.BASE64.decode(secret);
		return Keys.hmacShaKeyFor(key);
	}
}
