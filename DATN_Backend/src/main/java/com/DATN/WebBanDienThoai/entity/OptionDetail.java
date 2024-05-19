package com.DATN.WebBanDienThoai.entity;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class OptionDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	
	private int status;
	private double price;
	private Double originPrice;
	private int quantity;
	
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;
	
	@ManyToOne
	@JoinColumn(name = "option_id1")
	private Option option1;
	
	@ManyToOne
	@JoinColumn(name = "option_id2")
	private Option option2;
	

	private String image;
	
	@OneToMany(mappedBy= "optionDetail")
	private Set<OrderDetail> orderDetails;
	
	@OneToMany(mappedBy = "optionDetail")
	private Set<Cart> carts;
	
}
