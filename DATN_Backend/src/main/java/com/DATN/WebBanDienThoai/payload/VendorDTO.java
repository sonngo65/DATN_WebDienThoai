package com.DATN.WebBanDienThoai.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendorDTO {
    private UUID id;
    private String name;
    private String image;


}
