package com.DATN.WebBanDienThoai.service.Impl;

import com.DATN.WebBanDienThoai.entity.Vendor;
import com.DATN.WebBanDienThoai.payload.VendorDTO;
import com.DATN.WebBanDienThoai.repository.VendorRepository;
import com.DATN.WebBanDienThoai.service.VendorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class VendorServiceImpl implements VendorService {

    private final VendorRepository vendorRepo;
    @Override
    public List<VendorDTO> listAllByCategoryId(UUID categoryId) {
        List<Vendor> vendorList = vendorRepo.findAllByCategoryId(categoryId);
        return vendorList.stream().map((vendor)->{
            VendorDTO vendorResponse = new VendorDTO();
            vendorResponse.setId(vendor.getId());
            vendorResponse.setName(vendor.getName());
            vendorResponse.setImage(vendor.getImage());
            return vendorResponse;
        }).toList();

    }
	@Override
	public VendorDTO findById(UUID id) {
		Optional<Vendor> vendorOptional = vendorRepo.findById(id);
		
		if(vendorOptional.isEmpty()) {
			return null;
		}
		Vendor vendor = vendorOptional.get();
		VendorDTO vendorResponse = new VendorDTO();
        vendorResponse.setId(vendor.getId());
        vendorResponse.setName(vendor.getName());
        vendorResponse.setImage(vendor.getImage());		
        return vendorResponse;
	}
}
