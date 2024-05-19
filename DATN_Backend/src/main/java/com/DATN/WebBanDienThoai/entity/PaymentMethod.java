package com.DATN.WebBanDienThoai.entity;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentMethod {
	 @Id
	 @GeneratedValue(strategy = GenerationType.UUID)
	 private UUID id;
	 private String name;
	 @OneToMany(mappedBy = "paymentMethod")
	 private Set<Orders> orders;
}
