package com.DATN.WebBanDienThoai.service;

import java.util.List;
import java.util.UUID;

import com.DATN.WebBanDienThoai.entity.News;
import com.DATN.WebBanDienThoai.payload.PageResponse;

public interface NewsService {
	String save(News news);
	List<News> findAllShow();
	PageResponse findAll(Integer pageNo,Integer pageSize,String sortBy);

	News findById(UUID id);
	String updateById(UUID id, News news);
	String deleteById(UUID id);
}
