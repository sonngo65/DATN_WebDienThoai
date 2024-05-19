package com.DATN.WebBanDienThoai.payload;

import java.util.ArrayList;
import java.util.List;

import com.DATN.WebBanDienThoai.entity.Banner;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class HomeBanner {
	private String primaryBanner;
	private List<String> slideBanner = new ArrayList<String>();
}
