package com.titarenko.catalog.service;

import com.titarenko.catalog.repository.EmployeeRepository;
import com.titarenko.catalog.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Iterable<Product> findAll(){
        return employeeRepository.findAll();
    }

    public void delete(Long id){
        employeeRepository.delete(id);
    }

    public void save(Product product) {
        employeeRepository.save(product);
    }
}
