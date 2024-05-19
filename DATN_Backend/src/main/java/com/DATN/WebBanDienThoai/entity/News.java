package com.DATN.WebBanDienThoai.entity;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class News {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private String title;
	private Date createdTime;
	private String image;
	private String summary;
	private String content;
}
