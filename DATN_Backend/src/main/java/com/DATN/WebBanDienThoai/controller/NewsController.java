package com.DATN.WebBanDienThoai.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DATN.WebBanDienThoai.entity.News;
import com.DATN.WebBanDienThoai.payload.PageResponse;
import com.DATN.WebBanDienThoai.service.NewsService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/news")
@AllArgsConstructor
@CrossOrigin
public class NewsController {
	private final NewsService newsService;

	@PostMapping
	ResponseEntity<String> addNews(@RequestBody News news) {
		String response = newsService.save(news);
		return new ResponseEntity<>(response, HttpStatus.CREATED);

	}

	@GetMapping
	ResponseEntity<PageResponse> listAllNews(@RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "10") Integer pageSize, @RequestParam(defaultValue = "id") String sortBy) {
		PageResponse newsList = newsService.findAll(pageNo,pageSize,sortBy);
		return new ResponseEntity<>(newsList, HttpStatus.OK);
	}
	
	@GetMapping("/show")
	ResponseEntity<List<News>> listAllNews() {
		List<News> newsList = newsService.findAllShow();
		return new ResponseEntity<>(newsList, HttpStatus.OK);
	}
	

	@GetMapping("/{newsId}")
	ResponseEntity<News> getNews(@PathVariable("newsId") UUID newsId){
		News news = newsService.findById(newsId);
		return new ResponseEntity<>(news,HttpStatus.OK);
	}
	@PutMapping("/{id}")
	ResponseEntity<String> updateNewsById(@PathVariable("id") UUID id, @RequestBody News news){
		String response = newsService.updateById(id,news);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	ResponseEntity<String> deleteNewsById(@PathVariable("id") UUID id){
		String response = newsService.deleteById(id);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
}
