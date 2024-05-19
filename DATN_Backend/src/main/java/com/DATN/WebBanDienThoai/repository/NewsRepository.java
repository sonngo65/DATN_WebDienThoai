package com.DATN.WebBanDienThoai.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.News;

@Repository
public interface NewsRepository extends JpaRepository<News, UUID>{
	Page<News> findAllByOrderByCreatedTimeDesc(Pageable paging);
	List<News> findAllByOrderByCreatedTimeDesc();
	@Query(value ="SELECT count(*) from news",nativeQuery = true)
	Long getTotalNews();
}
