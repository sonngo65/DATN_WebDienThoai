package com.DATN.WebBanDienThoai.entity;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@AllArgsConstructor 
@NoArgsConstructor      
@Getter
@Setter
public class Banner {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private boolean isPrimaryBanner;
	private boolean isSlideBanner;
	private boolean isShow;

	private String image;
	
}
