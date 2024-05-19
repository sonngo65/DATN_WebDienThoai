package com.DATN.WebBanDienThoai.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DATN.WebBanDienThoai.entity.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,UUID>{
	
}
