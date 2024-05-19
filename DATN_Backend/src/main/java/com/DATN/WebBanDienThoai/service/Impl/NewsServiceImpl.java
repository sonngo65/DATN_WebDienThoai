package com.DATN.WebBanDienThoai.service.Impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.DATN.WebBanDienThoai.entity.News;
import com.DATN.WebBanDienThoai.payload.PageResponse;
import com.DATN.WebBanDienThoai.repository.NewsRepository;
import com.DATN.WebBanDienThoai.service.FileStorageService;
import com.DATN.WebBanDienThoai.service.NewsService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NewsServiceImpl implements NewsService{

	private final NewsRepository newsRepo;
	private final FileStorageService fileStorageService;
	@Override
	public String save(News news) {
		 news.setCreatedTime(new Date());
		 newsRepo.save(news);
		return "Add news successfully";
	}
	@Override
	public PageResponse findAll(Integer pageNo,Integer pageSize,String sortBy) {
		
		PageResponse pageResponse= new PageResponse();
		Pageable paging = PageRequest.of(pageNo,pageSize,Sort.by(sortBy));
		Page<News> pageResult = newsRepo.findAllByOrderByCreatedTimeDesc(paging);
		pageResponse.setPageData( pageResult.getContent().stream().map((newsItem)->{
			newsItem.setImage(fileStorageService.getUrl(newsItem.getImage()));
			return newsItem;
		}).toList());
		pageResponse.setTotalPages(pageResult.getTotalPages());
		return pageResponse;
	}
	@Override
	public List<News> findAllShow() {
		
		
		return newsRepo.findAllByOrderByCreatedTimeDesc().stream().map((newsItem)->{
			newsItem.setImage(fileStorageService.getUrl(newsItem.getImage()));
			return newsItem;
		}).toList();
	
	}
	
	@Override
	public News findById(UUID id) {
		News news = newsRepo.findById(id).get();
		return news;
	}
	@Override
	public String updateById(UUID id, News news) {
		Optional<News> oldNewsOptional = newsRepo.findById(id);
		if(oldNewsOptional.isEmpty()) {
			return "can't update news with id = " + id;
		}
		News oldNews = oldNewsOptional.get();
		oldNews.setTitle(news.getTitle());
		oldNews.setCreatedTime(news.getCreatedTime());
		oldNews.setImage(news.getImage());
		oldNews.setContent(news.getContent());
		oldNews.setSummary(news.getSummary());
		newsRepo.save(oldNews);
		return "update successfully";
	}
	@Override
	public String deleteById(UUID id) {
		Optional<News> oldNewsOptional = newsRepo.findById(id);
		if(oldNewsOptional.isEmpty()) {
			return "can't delete news with id = " + id;
		}
		News oldNews = oldNewsOptional.get();

		newsRepo.delete(oldNews);
		return "delete successfully";
	}

}
