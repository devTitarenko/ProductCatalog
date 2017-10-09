package com.titarenko.catalog;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Version;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
public class Product {

    private @Id @GeneratedValue Long id;
    private String productName;
    private Integer price;
    private String description;

    private @Version @JsonIgnore
    Long version;

    private Product() {
    }

    public Product(String productName, Integer price, String description) {
        this.productName = productName;
        this.price = price;
        this.description = description;
    }

//	for test; in case you don't like Lombok
    public Long getId() {
        return id;
    }
}