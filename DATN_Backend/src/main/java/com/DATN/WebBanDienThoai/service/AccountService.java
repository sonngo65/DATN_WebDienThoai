package com.DATN.WebBanDienThoai.service;

import java.util.List;

import com.DATN.WebBanDienThoai.payload.AccountRequest;
import com.DATN.WebBanDienThoai.payload.AccountResponse;
import com.DATN.WebBanDienThoai.payload.LoginResponse;
import com.DATN.WebBanDienThoai.payload.PageResponse;

public interface AccountService {
	String save(AccountRequest accountRequest);
	LoginResponse login(AccountRequest accountRequest);
	PageResponse findAll(Integer pageNo, Integer pageSize, String sortBy);
}
