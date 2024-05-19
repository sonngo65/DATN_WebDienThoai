package com.DATN.WebBanDienThoai.payload;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OptionDTO {
	private String title;
	private List<ChildOptionDTO> childOptions; 
	//	private ChildOptions childOptionsRequest;
}	
