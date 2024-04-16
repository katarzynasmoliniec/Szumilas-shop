package com.example.SzumiLas.service;

import com.example.SzumiLas.dto.PaymentInfo;
import com.example.SzumiLas.dto.Purchase;
import com.example.SzumiLas.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent (PaymentInfo paymentInfo) throws StripeException;
}
