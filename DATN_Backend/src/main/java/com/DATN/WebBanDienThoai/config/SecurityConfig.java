package com.DATN.WebBanDienThoai.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.DATN.WebBanDienThoai.security.JwtSecurityFilter;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@SecurityScheme(name = "Authorization Bearer", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "Jwts"

)

public class SecurityConfig {

	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private JwtSecurityFilter jwtSecurityFilter;
	private String baseUrl = "/api/v1";

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity.csrf(csrf -> csrf.disable()).cors(Customizer.withDefaults())
				.authorizeHttpRequests(authorizeHttpRequest -> authorizeHttpRequest
						.requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
						.requestMatchers(HttpMethod.POST, baseUrl + "/products").hasAuthority("ROLE_ADMIN")
						.requestMatchers(HttpMethod.PUT, baseUrl + "/products/*").hasAuthority("ROLE_ADMIN")
//						.requestMatchers(HttpMethod.DELETE, baseUrl + "/products/{*}").hasAuthority("ROLE_ADMIN")
						.requestMatchers(baseUrl + "/products/statistic/all").hasAuthority("ROLE_ADMIN")
						.requestMatchers(baseUrl + "/products/statistic/sales").hasAuthority("ROLE_ADMIN")
						.requestMatchers(baseUrl + "/products/statistic/erning").hasAuthority("ROLE_ADMIN")
						.requestMatchers(HttpMethod.POST, baseUrl + "/products/flash-sale").hasAuthority("ROLE_ADMIN")
//						.requestMatchers(HttpMethod.DELETE, baseUrl + "/products/flash-sale").hasAuthority("ROLE_ADMIN")
						.requestMatchers(HttpMethod.POST, baseUrl + "/categories").hasAuthority("ROLE_ADMIN")
						.requestMatchers(HttpMethod.PUT, baseUrl + "/categories").hasAuthority("ROLE_ADMIN")
						.requestMatchers(HttpMethod.DELETE, baseUrl + "/categories/*").hasAuthority("ROLE_ADMIN")
						.requestMatchers(HttpMethod.POST, baseUrl + "/news").hasAuthority("ROLE_ADMIN")
						.requestMatchers(HttpMethod.PUT, baseUrl + "/news/*").hasAuthority("ROLE_ADMIN")
						.requestMatchers(HttpMethod.DELETE, baseUrl + "/news/*").hasAuthority("ROLE_ADMIN")
						.requestMatchers(baseUrl + "/statistic/**").hasAuthority("ROLE_ADMIN")

						// .requestMatchers("/api/v1/login","/api/v1/accounts/email","/api/v1/accounts/email/*","/api/v1/accounts/password").permitAll()
//						.requestMatchers(HttpMethod.POST, "/api/v1/accounts").permitAll()
						.anyRequest().permitAll())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(jwtSecurityFilter, UsernamePasswordAuthenticationFilter.class).build();
	}

	@Bean
	AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
