package com.DATN.WebBanDienThoai.entity;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	@ManyToOne
	@JoinColumn(name = "account_id")
	private Account account;
	
	@ManyToOne
	@JoinColumn(name = "option_detail_id")
	private OptionDetail optionDetail;
	private int quantity;
	private Integer status;
	
}
