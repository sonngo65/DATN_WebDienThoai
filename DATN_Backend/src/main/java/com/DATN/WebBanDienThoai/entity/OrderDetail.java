package com.DATN.WebBanDienThoai.entity;

import java.util.Date;
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
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	private int quantity;
	
	@ManyToOne
	@JoinColumn(name = "order_id")
	private Orders order;

	@ManyToOne
	@JoinColumn(name = "option_detial_id")
	private OptionDetail optionDetail;
	
	private double price;

}
