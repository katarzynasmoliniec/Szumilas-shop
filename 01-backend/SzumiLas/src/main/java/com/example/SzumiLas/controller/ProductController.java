package com.example.SzumiLas.controller;

import com.example.SzumiLas.dto.ProductDTO;
import com.example.SzumiLas.entity.Product;
import com.example.SzumiLas.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(value ="http://localhost:4200")
@RestController
@RequestMapping("/api/products")
class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    ResponseEntity<Product> placeProduct(@RequestPart ProductDTO product, @RequestParam List<MultipartFile> images ) {
        return ResponseEntity.ok(this.productService.placeProduct(product, images));
    }

    @DeleteMapping
    ResponseEntity<?> deleteProduct(@RequestParam String id) {
        this.productService.deleteProduct(Long.valueOf(id));
        return ResponseEntity.accepted().build();
    }
}
