package com.example.SzumiLas.service;

import com.example.SzumiLas.dto.Purchase;
import com.example.SzumiLas.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
