package com.DATN.WebBanDienThoai.service;


import com.DATN.WebBanDienThoai.payload.VendorDTO;

import java.util.List;
import java.util.UUID;

public interface VendorService {
    List<VendorDTO> listAllByCategoryId(UUID CategoryId);
    VendorDTO findById(UUID id);
}
