package com.DATN.WebBanDienThoai.entity;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private String Name;
	
	@ManyToMany
	@JoinTable(name = "productInCategory",joinColumns = @JoinColumn(name = "category_id"),inverseJoinColumns = @JoinColumn(name = "product_id"))
	private Set<Product> products;
	
	@ManyToOne
	@JoinColumn(name = "parent_id")
	private Category category;

	private Integer position;

	private String image;
		
	private Boolean isShow;
	
	private String desciption;
	
	@OrderBy
	@OneToMany(mappedBy = "category")
	private Set<Vendor> vendors;
}
