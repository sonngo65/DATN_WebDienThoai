package com.DATN.WebBanDienThoai.controller;

import com.DATN.WebBanDienThoai.entity.Vendor;
import com.DATN.WebBanDienThoai.payload.VendorDTO;
import com.DATN.WebBanDienThoai.service.VendorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/vendors")
@AllArgsConstructor
@CrossOrigin
public class VendorController {

    private final VendorService vendorService;
    @GetMapping
    public ResponseEntity<List<VendorDTO>> getAllVendorsByCategoryId(@RequestParam("categoryId")UUID categoryId){
        List<VendorDTO> vendorDTOList = vendorService.listAllByCategoryId(categoryId);
        return  new ResponseEntity<>(vendorDTOList, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<VendorDTO> getById(@PathVariable UUID id){
    	VendorDTO vendorResponse = vendorService.findById(id);
    	return new ResponseEntity<>(vendorResponse,HttpStatus.OK);
    }

}
