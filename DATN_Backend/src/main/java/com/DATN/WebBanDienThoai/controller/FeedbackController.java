package com.DATN.WebBanDienThoai.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DATN.WebBanDienThoai.entity.Feedback;
import com.DATN.WebBanDienThoai.service.FeedbackService;
import com.DATN.WebBanDienThoai.service.Impl.FeedbackServiceImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/feedbacks")
@AllArgsConstructor
@CrossOrigin
public class FeedbackController {
	private final FeedbackService feedbackService;
	@GetMapping
	ResponseEntity<List<Feedback>> getAll(){
		List<Feedback> feedbackList = feedbackService.findAll();
		return new ResponseEntity<>(feedbackList,HttpStatus.OK);
	}
	@PostMapping
	ResponseEntity<String> save(@RequestBody Feedback feedback){
		String response = feedbackService.save(feedback);
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
	@GetMapping("/{id}")
	ResponseEntity<Feedback> getById(@PathVariable UUID id){
		Feedback feedback = feedbackService.findById(id);
		return new ResponseEntity<>(feedback,HttpStatus.OK);
	}
	@PutMapping("/{id}")
	ResponseEntity<String> updateById(@PathVariable UUID id,@RequestBody Feedback feedback)
	{
		String response = feedbackService.updateById(id, feedback);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	ResponseEntity<String> deleteById(@PathVariable UUID id)
	{
		String response = feedbackService.deleteById(id);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
}
