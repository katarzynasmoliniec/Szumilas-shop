package com.example.SzumiLas.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDTO {
    private String name;
    private String description;
    private BigDecimal unitPrice;
    private String imageUrl;
    private String category;
}
