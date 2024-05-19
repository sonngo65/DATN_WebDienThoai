package com.DATN.WebBanDienThoai.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.Account;

@Repository
public interface AccountRepository  extends JpaRepository<Account, UUID>{
	
	Optional<Account> findByUsername(String username);
	
	Page<Account> findAll(Pageable paging);
	
	@Query(value = "SELECT count(*) from account",nativeQuery = true)
	Long getTotalAccounts(); 
	
	
	Account findByUsernameAndPassword(String username,String password);
	
}
