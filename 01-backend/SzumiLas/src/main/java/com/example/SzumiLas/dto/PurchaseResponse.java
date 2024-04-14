package com.example.SzumiLas.dto;

import lombok.Data;
import lombok.NonNull;

@Data
public class PurchaseResponse {

    @NonNull
    // lub private final String
    private String orderTrackingNumber;
}
