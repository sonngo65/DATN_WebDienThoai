package com.DATN.WebBanDienThoai.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
	
	@Bean
	Path getPath() {
		return Paths.get("src/main/resources/uploads");
	}

}
