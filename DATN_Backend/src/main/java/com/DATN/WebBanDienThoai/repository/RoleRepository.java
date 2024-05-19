package com.DATN.WebBanDienThoai.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DATN.WebBanDienThoai.entity.Role;

public interface RoleRepository extends JpaRepository<Role, UUID>{
	Role findByName(String name);
}
