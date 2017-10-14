package com.titarenko.catalog.repository;

import com.titarenko.catalog.model.Product;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface EmployeeRepository extends PagingAndSortingRepository<Product, Long> {
}