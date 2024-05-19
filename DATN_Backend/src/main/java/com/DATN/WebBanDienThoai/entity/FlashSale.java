package com.DATN.WebBanDienThoai.entity;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.GeneratorType;

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
public class FlashSale {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private Date endTime;
	@OneToMany(mappedBy = "flashSale")
	private Set<Product>   products;
}
