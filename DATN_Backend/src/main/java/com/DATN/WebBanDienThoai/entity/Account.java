package com.DATN.WebBanDienThoai.entity;

import java.util.Collection;
import java.util.Date;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
public class Account implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private String name;
	private String phoneNumber;
	private String ddress;
	private Date dateOrBirth;
	private String username;
	private String password;
	private int status;
	
	@OneToMany(mappedBy = "account")
	private Set<Cart> carts;
	
	@OneToMany(mappedBy = "account")
	private Set<Orders> orders;
	
	@OneToOne
	@JoinColumn(name = "receive_info_id",referencedColumnName = "id")
	private ReceiveInfo receiveInfo;
	
	@ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinTable(name = "permission", joinColumns = @JoinColumn(name =  "account_id"),inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles;
	
	@OneToMany(mappedBy = "account")
	private Set<Comment> comments;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream().map((role) ->  new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO t-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
}
