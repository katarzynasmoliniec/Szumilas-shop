package com.example.SzumiLas.dto;

import com.example.SzumiLas.entity.Address;
import com.example.SzumiLas.entity.Customer;
import com.example.SzumiLas.entity.Order;
import com.example.SzumiLas.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
