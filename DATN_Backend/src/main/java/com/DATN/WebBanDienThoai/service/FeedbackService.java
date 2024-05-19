package com.DATN.WebBanDienThoai.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.DATN.WebBanDienThoai.entity.Feedback;


public interface FeedbackService {
	String save(Feedback feedback);
	List<Feedback> findAll();
	Feedback findById(UUID id);
	String updateById(UUID id, Feedback feedback);
	String deleteById(UUID id);
}
