package com.example.SzumiLas.dao;

import com.example.SzumiLas.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
