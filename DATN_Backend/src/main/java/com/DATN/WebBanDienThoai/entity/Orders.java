package com.DATN.WebBanDienThoai.entity;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private Date  orderDate;
	private int status;

	
	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Account account;
	
	@ManyToOne
	@JoinColumn(name = "payment_method_id")
	private PaymentMethod paymentMethod;
	
	@OneToMany(mappedBy = "order")
	@OrderBy
	private Set<OrderDetail> orderDetails;
	
}
